import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { ITLogin } from './components/it-app/ITLogin';
import { ITShell } from './components/it-app/ITShell';
import { ThemeProvider } from './components/ThemeProvider';
import { Toaster } from './components/ui/sonner';
import ErrorBoundary from './components/ErrorBoundary';
import { createClient } from './utils/supabase/client';
import { initializePermissions } from './utils/permissions';
import type { User, UserRole } from './App';
import type { Session } from '@supabase/supabase-js';
import './index.css';

function ITApp() {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | undefined>();
  const [loading, setLoading] = useState(true);

  const supabase = createClient();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setAccessToken(session?.access_token);
      if (session?.user) {
        loadProfile(session);
      } else {
        setLoading(false);
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT') {
        setSession(null);
        setUser(null);
        setAccessToken(undefined);
        setLoading(false);
        return;
      }
      if (event === 'TOKEN_REFRESHED') {
        setSession(session);
        setAccessToken(session?.access_token);
        return;
      }
      setSession(session);
      setAccessToken(session?.access_token);
      if (session?.user) {
        loadProfile(session);
      } else {
        setUser(null);
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const loadProfile = async (session: Session) => {
    try {
      const { data: profile } = await supabase
        .from('profiles')
        .select('id, email, role, organization_id, name, avatar_url')
        .eq('id', session.user.id)
        .single() as { data: any };

      if (profile) {
        const allowedRoles: UserRole[] = [
          'super_admin',
          'admin',
        ];
        if (!allowedRoles.includes(profile.role as UserRole)) {
          await supabase.auth.signOut();
          setUser(null);
          setSession(null);
          setLoading(false);
          return;
        }

        if (profile.organization_id) {
          localStorage.setItem('currentOrgId', profile.organization_id);
        }

        await initializePermissions(profile.role);

        setUser({
          id: profile.id,
          email: profile.email,
          role: profile.role as UserRole,
          full_name: profile.name,
          avatar_url: profile.avatar_url,
          organization_id: profile.organization_id,
          organizationId: profile.organization_id,
        });
      }
    } catch {
      // Profile load failed
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (loggedInUser: User, token: string) => {
    await initializePermissions(loggedInUser.role);
    if (loggedInUser.organizationId || loggedInUser.organization_id) {
      const orgId = loggedInUser.organizationId || loggedInUser.organization_id;
      if (orgId) localStorage.setItem('currentOrgId', orgId);
    }
    setUser(loggedInUser);
    setAccessToken(token);
  };

  const handleLogout = () => {
    setUser(null);
    setSession(null);
    setAccessToken(undefined);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-600 mx-auto mb-4" />
          <p className="text-slate-500">Loading IT Space...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <ErrorBoundary>
        <Toaster />
        <ITLogin onLogin={handleLogin} />
      </ErrorBoundary>
    );
  }

  return (
    <ErrorBoundary>
      <ThemeProvider userId={user.id}>
        <Toaster />
        <ITShell user={user} accessToken={accessToken} onLogout={handleLogout} />
      </ThemeProvider>
    </ErrorBoundary>
  );
}

createRoot(document.getElementById('root')!).render(<ITApp />);
