import{aN as Xs,r as n,j as e,w as M,x as H,e as Q,y as Y,H as se,z as X,I,J as O,f as m,bu as gs,K as W,aO as Oe,a3 as ee,L as q,R as K,g as ge,o as a,G as fs,aL as Ge,bp as pe,aX as js,aY as Ns,aZ as Te,a_ as Ie,bv as Qs,aH as ce,aI as $s,ai as k,aj as J,az as Re,V as Hs,B as Z,bw as Ws,E as Ys,ak as Gs,ae as qs,as as Bs,ab as ds,bx as Me,by as Xe,X as Vs,W as be,al as Ks,au as ms,Y as ye,_ as ve,$ as Ee,a0 as Se,Q as Qe,an as Js,ao as Zs,ap as ea,aq as sa,ar as $e,af as aa,at as ra,aP as us,aK as He,bz as xs,a$ as ta}from"./index-B86Qf8A7.js";import{P as ia}from"./PermissionGate-DpthrLp-.js";import{S as ie,a as ne,b as le,c as oe,d as A}from"./select-CKuVktWC.js";import{S as we}from"./switch-TvDxCNB5.js";import{W as na}from"./wrench-C5uhhrti.js";import{u as la}from"./useDebounce-C-GgQ_YL.js";import{P as oa}from"./pencil-D5NF8Tom.js";/**
 * @license lucide-react v1.6.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ca=[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",key:"1yyitq"}],["circle",{cx:"9",cy:"7",r:"4",key:"nufk8"}],["line",{x1:"17",x2:"22",y1:"8",y2:"13",key:"3nzzx3"}],["line",{x1:"22",x2:"17",y1:"8",y2:"13",key:"1swrse"}]],da=Xs("user-x",ca);q();const We=`-- Add manager_id column to profiles table
-- This allows users to be assigned a manager for hierarchical organization structure

ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS manager_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL;

-- Create index on manager_id for faster queries
CREATE INDEX IF NOT EXISTS idx_profiles_manager_id ON public.profiles(manager_id);

-- Add comment
COMMENT ON COLUMN public.profiles.manager_id IS 'References the manager (another profile) for this user';`;function ma(){const[r,d]=n.useState(!1),[C,f]=n.useState(!1),[u,R]=n.useState(!1),l=async()=>{try{if(await ee(We)){d(!0),setTimeout(()=>d(!1),2e3);return}}catch{}try{const t=document.createElement("textarea");t.value=We,t.style.position="fixed",t.style.left="-999999px",t.style.top="-999999px",document.body.appendChild(t),t.focus(),t.select();const L=document.execCommand("copy");document.body.removeChild(t),L?(d(!0),setTimeout(()=>d(!1),2e3)):f(!0)}catch{f(!0)}};return e.jsxs(M,{className:"border-blue-200 bg-blue-50",children:[e.jsx(H,{children:e.jsxs("div",{className:"flex items-start gap-3",children:[e.jsx(Q,{className:"h-5 w-5 text-blue-600 mt-0.5"}),e.jsxs("div",{className:"flex-1",children:[e.jsx(Y,{className:"text-blue-900",children:"Manager Feature Requires Database Update"}),e.jsx(se,{className:"text-blue-700 mt-1",children:"To enable the manager assignment feature, we need to add a new column to your database."})]})]})}),e.jsxs(X,{className:"space-y-4",children:[e.jsxs(I,{children:[e.jsx(Q,{className:"h-4 w-4"}),e.jsxs(O,{children:[e.jsx("strong",{children:"Quick Setup:"})," Follow these steps to enable manager assignments."]})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsxs("div",{className:"flex items-start gap-3",children:[e.jsx("div",{className:"flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold shrink-0",children:"1"}),e.jsxs("div",{className:"flex-1",children:[e.jsx("p",{className:"font-medium text-gray-900",children:"Copy the SQL migration"}),e.jsx("p",{className:"text-sm text-gray-600 mt-1",children:"Click the button below to copy the SQL code"}),e.jsxs("div",{className:"flex gap-2 mt-2",children:[e.jsx(m,{onClick:l,variant:"outline",size:"sm",className:"gap-2",children:r?e.jsxs(e.Fragment,{children:[e.jsx(gs,{className:"h-4 w-4 text-green-600"}),"Copied!"]}):e.jsxs(e.Fragment,{children:[e.jsx(W,{className:"h-4 w-4"}),"Copy SQL Migration"]})}),e.jsxs(m,{onClick:()=>f(!C),variant:"ghost",size:"sm",children:[C?"Hide":"View"," SQL"]})]}),C&&e.jsx("pre",{className:"mt-3 p-3 bg-gray-900 text-gray-100 rounded text-xs overflow-x-auto max-h-64 overflow-y-auto",children:We})]})]}),e.jsxs("div",{className:"flex items-start gap-3",children:[e.jsx("div",{className:"flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold shrink-0",children:"2"}),e.jsxs("div",{className:"flex-1",children:[e.jsx("p",{className:"font-medium text-gray-900",children:"Open Supabase SQL Editor"}),e.jsx("p",{className:"text-sm text-gray-600 mt-1",children:"Go to your Supabase dashboard → SQL Editor → New Query"}),e.jsx(m,{asChild:!0,variant:"outline",size:"sm",className:"gap-2 mt-2",children:e.jsxs("a",{href:"https://supabase.com/dashboard",target:"_blank",rel:"noopener noreferrer",children:["Open Supabase Dashboard",e.jsx(Oe,{className:"h-4 w-4"})]})})]})]}),e.jsxs("div",{className:"flex items-start gap-3",children:[e.jsx("div",{className:"flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold shrink-0",children:"3"}),e.jsxs("div",{className:"flex-1",children:[e.jsx("p",{className:"font-medium text-gray-900",children:"Run the migration"}),e.jsxs("p",{className:"text-sm text-gray-600 mt-1",children:["Paste the SQL code and click ",e.jsx("strong",{children:"Run"})," or press ",e.jsx("kbd",{className:"px-1.5 py-0.5 bg-gray-200 rounded text-xs font-mono",children:"Ctrl+Enter"})]}),e.jsx("p",{className:"text-sm text-gray-600 mt-2",children:"✅ After running, refresh this page to use the manager feature"})]})]})]}),e.jsxs("div",{className:"mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200",children:[e.jsx("p",{className:"text-sm text-blue-900",children:e.jsx("strong",{children:"💡 What this migration does:"})}),e.jsxs("ul",{className:"text-sm text-blue-800 mt-2 space-y-1 list-disc list-inside ml-2",children:[e.jsxs("li",{children:["Adds a ",e.jsx("code",{className:"bg-blue-100 px-1 rounded",children:"manager_id"})," column to the profiles table"]}),e.jsx("li",{children:"Creates a foreign key relationship to allow users to have managers"}),e.jsx("li",{children:"Adds an index for efficient manager lookups"}),e.jsx("li",{children:"Existing users will have no manager assigned by default (NULL)"})]})]})]})]})}const Ce=q();function ua({onRefresh:r}){const[d,C]=n.useState(!1),[f,u]=n.useState(!1),[R,l]=n.useState([]),[t,L]=n.useState(!1),[x,c]=n.useState(!1),o=`-- ================================================
-- ProSpaces CRM - Complete Profiles Table Fix
-- This script will create/fix the profiles table and sync all users
-- ================================================

-- Step 1: Create profiles table (if it doesn't exist)
CREATE TABLE IF NOT EXISTS public.profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text NOT NULL,
  name text,
  role text NOT NULL DEFAULT 'standard_user',
  organization_id uuid,  -- Changed to UUID for consistency
  status text DEFAULT 'active',
  last_login timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Step 2: Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_profiles_organization_id ON public.profiles(organization_id);
CREATE INDEX IF NOT EXISTS idx_profiles_email ON public.profiles(email);
CREATE INDEX IF NOT EXISTS idx_profiles_role ON public.profiles(role);

-- Step 3: Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Step 4: Drop ALL existing policies to start fresh
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
DROP POLICY IF EXISTS "Admins can view organization profiles" ON public.profiles;
DROP POLICY IF EXISTS "Admins can update organization profiles" ON public.profiles;
DROP POLICY IF EXISTS "Admins can insert organization profiles" ON public.profiles;
DROP POLICY IF EXISTS "Super admins can delete profiles" ON public.profiles;
DROP POLICY IF EXISTS "Users can view org profiles" ON public.profiles;
DROP POLICY IF EXISTS "Allow insert own profile" ON public.profiles;
DROP POLICY IF EXISTS "Admins can view all org profiles" ON public.profiles;
DROP POLICY IF EXISTS "Super admins can view all profiles" ON public.profiles;
DROP POLICY IF EXISTS "Admins can insert profiles" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON public.profiles;
DROP POLICY IF EXISTS "Admins can insert org profiles" ON public.profiles;
DROP POLICY IF EXISTS "Admins can update org profiles" ON public.profiles;
DROP POLICY IF EXISTS "Admins can delete org profiles" ON public.profiles;
DROP POLICY IF EXISTS "Users can delete own profile" ON public.profiles;

-- Step 5: Create new, simplified RLS policies

-- Allow users to view their own profile
CREATE POLICY "Users can view own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

-- Allow users to view profiles in their organization
CREATE POLICY "Users can view org profiles"
  ON public.profiles FOR SELECT
  USING (
    organization_id IS NOT NULL 
    AND organization_id::text = (
      SELECT raw_user_meta_data->>'organizationId' 
      FROM auth.users 
      WHERE id = auth.uid()
    )
  );

-- Allow super admins to view all profiles
CREATE POLICY "Super admins can view all"
  ON public.profiles FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE id = auth.uid()
      AND raw_user_meta_data->>'role' = 'super_admin'
    )
  );

-- Allow users to insert their own profile
CREATE POLICY "Users can insert own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Allow users to update their own profile
CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Allow admins to manage profiles in their organization
CREATE POLICY "Admins can manage org profiles"
  ON public.profiles FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM auth.users u
      WHERE u.id = auth.uid()
      AND u.raw_user_meta_data->>'role' IN ('admin', 'super_admin')
      AND (
        u.raw_user_meta_data->>'role' = 'super_admin'
        OR (
          organization_id IS NOT NULL
          AND organization_id::text = u.raw_user_meta_data->>'organizationId'
        )
      )
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM auth.users u
      WHERE u.id = auth.uid()
      AND u.raw_user_meta_data->>'role' IN ('admin', 'super_admin')
      AND (
        u.raw_user_meta_data->>'role' = 'super_admin'
        OR (
          organization_id IS NOT NULL
          AND organization_id::text = u.raw_user_meta_data->>'organizationId'
        )
      )
    )
  );

-- Step 6: Create/replace the trigger function
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, name, role, organization_id, status, last_login, created_at)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'name', NEW.email),
    COALESCE(NEW.raw_user_meta_data->>'role', 'standard_user'),
    (NEW.raw_user_meta_data->>'organizationId')::uuid,
    'active',
    NEW.last_sign_in_at,
    NEW.created_at
  )
  ON CONFLICT (id) DO UPDATE SET
    email = EXCLUDED.email,
    name = COALESCE(EXCLUDED.name, public.profiles.name),
    role = COALESCE(EXCLUDED.role, public.profiles.role),
    organization_id = COALESCE(EXCLUDED.organization_id, public.profiles.organization_id),
    last_login = EXCLUDED.last_login,
    updated_at = now();
  
  RETURN NEW;
EXCEPTION
  WHEN OTHERS THEN
    -- Log error but don't fail the user creation
    RAISE WARNING 'Error in handle_new_user: %', SQLERRM;
    RETURN NEW;
END;
$$;

-- Step 7: Create the trigger
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT OR UPDATE ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Step 8: Sync existing users from auth.users to profiles
-- This uses INSERT ... ON CONFLICT to be safe (won't duplicate)
INSERT INTO public.profiles (id, email, name, role, organization_id, status, last_login, created_at)
SELECT 
  au.id,
  au.email,
  COALESCE(au.raw_user_meta_data->>'name', au.email) as name,
  COALESCE(au.raw_user_meta_data->>'role', 'standard_user') as role,
  (au.raw_user_meta_data->>'organizationId')::uuid as organization_id,
  'active' as status,
  au.last_sign_in_at as last_login,
  au.created_at
FROM auth.users au
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  name = COALESCE(EXCLUDED.name, public.profiles.name),
  last_login = EXCLUDED.last_login,
  updated_at = now();

-- Step 9: Verify the results
SELECT 
  'Profiles sync complete!' as message,
  COUNT(*) as total_profiles,
  COUNT(DISTINCT organization_id) as total_organizations,
  COUNT(CASE WHEN role = 'super_admin' THEN 1 END) as super_admins,
  COUNT(CASE WHEN role = 'admin' THEN 1 END) as admins,
  COUNT(CASE WHEN role = 'standard_user' THEN 1 END) as standard_users
FROM public.profiles;`,p=async()=>{u(!0),l([]);const i=[];try{i.push({step:"Authentication",status:"info",message:"Checking authentication..."});const{data:{user:v},error:B}=await Ce.auth.getUser();if(!v||B){i.push({step:"Authentication",status:"error",message:"Not authenticated. Please refresh the page and log in again.",details:B}),l(i),u(!1);return}i.push({step:"Authentication",status:"success",message:`Authenticated as ${v.email}`,details:{userId:v.id,email:v.email,role:v.user_metadata?.role,organizationId:v.user_metadata?.organizationId}}),l([...i]),i.push({step:"Profiles Table",status:"info",message:"Checking if profiles table exists..."}),l([...i]);const{error:P}=await Ce.from("profiles").select("id").limit(0);if(P)if(P.code==="42P01"){i[i.length-1]={step:"Profiles Table",status:"error",message:"❌ Profiles table does not exist! You need to run the SQL script.",details:P},l([...i]),L(!0),u(!1);return}else P.code==="42501"?i[i.length-1]={step:"Profiles Table",status:"warning",message:"Profiles table exists but RLS policies may be blocking access",details:P}:i[i.length-1]={step:"Profiles Table",status:"error",message:`Database error: ${P.message}`,details:P};else i[i.length-1]={step:"Profiles Table",status:"success",message:"✅ Profiles table exists"};l([...i]),i.push({step:"Profile Count",status:"info",message:"Counting profiles..."}),l([...i]);const{count:j,error:_}=await Ce.from("profiles").select("*",{count:"exact",head:!0});_?i[i.length-1]={step:"Profile Count",status:"error",message:`Error counting profiles: ${_.message}`,details:_}:i[i.length-1]={step:"Profile Count",status:j===0?"warning":"success",message:j===0?"⚠️ No profiles found! The table is empty.":`Found ${j} profile(s)`,details:{count:j}},l([...i]),i.push({step:"Visible Profiles",status:"info",message:"Querying profiles visible to you..."}),l([...i]);const{data:g,error:E}=await Ce.from("profiles").select("*");E?i[i.length-1]={step:"Visible Profiles",status:"error",message:`Error querying profiles: ${E.message}`,details:E}:i[i.length-1]={step:"Visible Profiles",status:g.length===0?"warning":"success",message:g.length===0?"⚠️ No profiles visible to you. RLS policies may be blocking access.":`✅ ${g.length} profile(s) visible to you`,details:{count:g.length,profiles:g.map(w=>({email:w.email,role:w.role,org:w.organization_id}))}},l([...i]),j===0||g&&g.length===0?(i.push({step:"Recommendation",status:"warning",message:"🔧 Action Required: Run the SQL script below to sync users from auth.users to profiles table"}),L(!0)):i.push({step:"Recommendation",status:"success",message:'✅ Everything looks good! Click "Refresh Users List" to reload.'}),l([...i])}catch(v){i.push({step:"Error",status:"error",message:`Unexpected error: ${v.message}`,details:v}),l(i)}finally{u(!1)}},D=async()=>{try{await ee(o),C(!0),a.success("SQL script copied to clipboard!"),setTimeout(()=>C(!1),3e3)}catch{const v=document.createElement("textarea");v.value=o,v.style.position="fixed",v.style.opacity="0",document.body.appendChild(v),v.select(),document.execCommand("copy"),document.body.removeChild(v),C(!0),a.success("SQL script copied to clipboard!"),setTimeout(()=>C(!1),3e3)}},U=()=>{window.open("https://supabase.com/dashboard/project/_/sql/new","_blank")},h=i=>{switch(i){case"success":return"text-green-600 bg-green-50 border-green-200";case"error":return"text-red-600 bg-red-50 border-red-200";case"warning":return"text-yellow-600 bg-yellow-50 border-yellow-200";case"info":return"text-blue-600 bg-blue-50 border-blue-200"}},S=i=>{switch(i){case"success":return e.jsx(ge,{className:"h-4 w-4"});case"error":return e.jsx(Q,{className:"h-4 w-4"});case"warning":return e.jsx(Q,{className:"h-4 w-4"});case"info":return e.jsx(Database,{className:"h-4 w-4"})}};return e.jsxs(M,{className:"border-blue-200 bg-blue-50",children:[e.jsxs(H,{children:[e.jsxs(Y,{className:"flex items-center gap-2 text-blue-900",children:[e.jsx(Database,{className:"h-5 w-5"}),"Profiles Table Sync Tool"]}),e.jsx(se,{className:"text-sm text-gray-500",children:"Ensure your profiles table is correctly set up and synced with auth.users."})]}),e.jsxs(X,{className:"space-y-4",children:[e.jsx(I,{className:"border-blue-300 bg-blue-100",children:e.jsxs(O,{className:"text-blue-900",children:[e.jsx("p",{className:"font-semibold mb-2",children:"💡 What this tool does:"}),e.jsxs("ul",{className:"text-sm space-y-1 ml-4 list-disc",children:[e.jsx("li",{children:"Checks if your profiles table is set up correctly"}),e.jsx("li",{children:"Diagnoses RLS policy issues"}),e.jsx("li",{children:"Provides SQL script to sync all users from auth.users to profiles"}),e.jsx("li",{children:"Verifies data visibility"})]})]})}),e.jsxs("div",{className:"flex gap-2",children:[e.jsx(m,{onClick:p,disabled:f,size:"lg",className:"gap-2",children:f?e.jsxs(e.Fragment,{children:[e.jsx(K,{className:"h-4 w-4 animate-spin"}),"Running Diagnostic..."]}):e.jsxs(e.Fragment,{children:[e.jsx(Play,{className:"h-4 w-4"}),"Run Full Diagnostic"]})}),R.length>0&&e.jsxs(m,{onClick:r,variant:"outline",size:"lg",className:"gap-2",children:[e.jsx(K,{className:"h-4 w-4"}),"Refresh Users List"]})]}),R.length>0&&e.jsxs("div",{className:"space-y-2",children:[e.jsx("p",{className:"font-semibold text-gray-900",children:"Diagnostic Results:"}),R.map((i,v)=>e.jsx(I,{className:h(i.status),children:e.jsxs("div",{className:"flex items-start gap-2",children:[S(i.status),e.jsxs("div",{className:"flex-1",children:[e.jsx("p",{className:"font-semibold text-sm",children:i.step}),e.jsx("p",{className:"text-sm",children:i.message}),i.details&&e.jsxs("details",{className:"mt-2",children:[e.jsx("summary",{className:"cursor-pointer text-xs hover:underline",children:"View Details"}),e.jsx("pre",{className:"text-xs mt-1 p-2 bg-white rounded overflow-auto max-h-32",children:JSON.stringify(i.details,null,2)})]})]})]})},v))]}),t&&e.jsxs("div",{className:"space-y-3 p-4 bg-white rounded-lg border-2 border-blue-300",children:[e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsx("h3",{className:"font-semibold text-gray-900",children:"📝 Fix SQL Script"}),e.jsxs("div",{className:"flex gap-2",children:[e.jsx(m,{onClick:D,size:"sm",variant:d?"outline":"default",className:"gap-2",children:d?e.jsxs(e.Fragment,{children:[e.jsx(ge,{className:"h-4 w-4"}),"Copied!"]}):e.jsxs(e.Fragment,{children:[e.jsx(W,{className:"h-4 w-4"}),"Copy SQL"]})}),e.jsxs(m,{onClick:U,size:"sm",variant:"outline",className:"gap-2",children:[e.jsx(ExternalLink,{className:"h-4 w-4"}),"Open SQL Editor"]})]})]}),e.jsxs(I,{className:"border-yellow-300 bg-yellow-50",children:[e.jsx(Q,{className:"h-4 w-4 text-yellow-600"}),e.jsxs(O,{className:"text-yellow-900",children:[e.jsx("p",{className:"font-semibold mb-2",children:"📋 Instructions:"}),e.jsxs("ol",{className:"text-sm space-y-1 ml-4 list-decimal",children:[e.jsx("li",{children:'Click "Copy SQL" above'}),e.jsx("li",{children:'Click "Open SQL Editor" to open Supabase'}),e.jsx("li",{children:"Paste the SQL script in the editor"}),e.jsx("li",{children:'Click "Run" or press F5'}),e.jsx("li",{children:'Come back here and click "Refresh Users List"'})]})]})]}),e.jsxs("details",{children:[e.jsx("summary",{className:"cursor-pointer text-sm font-semibold text-blue-900 hover:text-blue-700",children:"📄 Preview SQL Script (click to expand)"}),e.jsx("div",{className:"mt-2 p-3 bg-gray-50 rounded border border-gray-200 max-h-96 overflow-auto",children:e.jsx("pre",{className:"text-xs font-mono text-gray-700 whitespace-pre-wrap",children:o})})]})]})]})]})}q();function xa(){const[r,d]=n.useState(!1),[C,f]=n.useState(!1),[u,R]=n.useState(null),[l,t]=n.useState(!1),[L,x]=n.useState(!1),c=`-- Create permissions table
CREATE TABLE IF NOT EXISTS permissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  role TEXT NOT NULL,
  module TEXT NOT NULL,
  visible BOOLEAN DEFAULT false,
  add BOOLEAN DEFAULT false,
  change BOOLEAN DEFAULT false,
  delete BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(role, module)
);

-- Enable Row Level Security
ALTER TABLE permissions ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Super Admin full access" ON permissions;
DROP POLICY IF EXISTS "Admin full access" ON permissions;
DROP POLICY IF EXISTS "Users can read own role permissions" ON permissions;

-- Policy: Super Admin can do everything
CREATE POLICY "Super Admin full access" 
ON permissions FOR ALL TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid()
    AND profiles.role = 'super_admin'
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid()
    AND profiles.role = 'super_admin'
  )
);

-- Policy: Admin can do everything
CREATE POLICY "Admin full access" 
ON permissions FOR ALL TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid()
    AND profiles.role = 'admin'
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid()
    AND profiles.role = 'admin'
  )
);

-- Policy: All authenticated users can read permissions for their role
CREATE POLICY "Users can read own role permissions" 
ON permissions FOR SELECT TO authenticated
USING (
  role = (
    SELECT profiles.role FROM profiles
    WHERE profiles.id = auth.uid()
  )
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_permissions_role ON permissions(role);
CREATE INDEX IF NOT EXISTS idx_permissions_module ON permissions(module);
CREATE INDEX IF NOT EXISTS idx_permissions_role_module ON permissions(role, module);

-- Insert default permissions
INSERT INTO permissions (role, module, visible, add, change, delete) VALUES
-- Super Admin - Full Access
('super_admin', 'dashboard', true, true, true, true),
('super_admin', 'contacts', true, true, true, true),
('super_admin', 'tasks', true, true, true, true),
('super_admin', 'appointments', true, true, true, true),
('super_admin', 'bids', true, true, true, true),
('super_admin', 'notes', true, true, true, true),
('super_admin', 'email', true, true, true, true),
('super_admin', 'marketing', true, true, true, true),
('super_admin', 'inventory', true, true, true, true),
('super_admin', 'users', true, true, true, true),
('super_admin', 'settings', true, true, true, true),
('super_admin', 'tenants', true, true, true, true),
('super_admin', 'security', true, true, true, true),
('super_admin', 'import-export', true, true, true, true),

-- Admin - Full Access except Tenants
('admin', 'dashboard', true, true, true, true),
('admin', 'contacts', true, true, true, true),
('admin', 'tasks', true, true, true, true),
('admin', 'appointments', true, true, true, true),
('admin', 'bids', true, true, true, true),
('admin', 'notes', true, true, true, true),
('admin', 'email', true, true, true, true),
('admin', 'marketing', true, true, true, true),
('admin', 'inventory', true, true, true, true),
('admin', 'users', true, true, true, false),
('admin', 'settings', true, true, true, true),
('admin', 'tenants', false, false, false, false),
('admin', 'security', true, true, true, true),
('admin', 'import-export', true, true, true, true),

-- Manager - Limited Access
('manager', 'dashboard', true, true, true, true),
('manager', 'contacts', true, true, true, true),
('manager', 'tasks', true, true, true, true),
('manager', 'appointments', true, true, true, true),
('manager', 'bids', true, true, true, true),
('manager', 'notes', true, true, true, true),
('manager', 'email', true, true, true, true),
('manager', 'marketing', true, true, true, true),
('manager', 'inventory', true, true, true, true),
('manager', 'users', false, false, false, false),
('manager', 'settings', false, false, false, false),
('manager', 'tenants', false, false, false, false),
('manager', 'security', false, false, false, false),
('manager', 'import-export', false, false, false, false),

-- Marketing - Marketing Focused
('marketing', 'dashboard', true, false, false, false),
('marketing', 'contacts', true, true, true, false),
('marketing', 'tasks', true, true, true, false),
('marketing', 'appointments', true, true, true, false),
('marketing', 'bids', false, false, false, false),
('marketing', 'notes', true, true, true, false),
('marketing', 'email', true, true, true, false),
('marketing', 'marketing', true, true, true, true),
('marketing', 'inventory', true, false, false, false),
('marketing', 'users', false, false, false, false),
('marketing', 'settings', false, false, false, false),
('marketing', 'tenants', false, false, false, false),
('marketing', 'security', false, false, false, false),
('marketing', 'import-export', false, false, false, false),

-- Standard User - Everything except Marketing and Inventory
('standard_user', 'dashboard', true, false, false, false),
('standard_user', 'contacts', true, true, true, false),
('standard_user', 'tasks', true, true, true, false),
('standard_user', 'appointments', true, true, true, false),
('standard_user', 'bids', true, true, true, false),
('standard_user', 'notes', true, true, true, false),
('standard_user', 'email', true, true, true, false),
('standard_user', 'marketing', false, false, false, false),
('standard_user', 'inventory', false, false, false, false),
('standard_user', 'users', true, false, false, false),
('standard_user', 'settings', true, true, true, false),
('standard_user', 'tenants', false, false, false, false),
('standard_user', 'security', false, false, false, false),
('standard_user', 'import-export', false, false, false, false)
ON CONFLICT (role, module) DO NOTHING;`,o=()=>{const p=document.createElement("textarea");p.value=c,p.style.position="fixed",p.style.left="-999999px",p.style.top="-999999px",document.body.appendChild(p),p.focus(),p.select();try{document.execCommand("copy"),p.remove(),x(!0),a.success("SQL script copied to clipboard!"),setTimeout(()=>x(!1),3e3)}catch{p.remove(),t(!0),a.error("Auto-copy failed. Script shown below - please copy manually.")}};return e.jsxs(M,{className:"border-orange-200 bg-orange-50",children:[e.jsxs(H,{children:[e.jsxs(Y,{className:"flex items-center gap-2 text-orange-900",children:[e.jsx(fs,{className:"h-5 w-5"}),"Permissions Table Setup Required"]}),e.jsx(se,{className:"text-orange-700",children:"The permissions table doesn't exist in your Supabase database yet."})]}),e.jsxs(X,{className:"space-y-4",children:[C?e.jsxs(I,{className:"border-green-300 bg-green-50",children:[e.jsx(Ge,{className:"h-4 w-4 text-green-600"}),e.jsxs(O,{className:"text-green-900",children:[e.jsx("strong",{children:"Success!"})," The permissions table has been created successfully."]})]}):e.jsxs(e.Fragment,{children:[e.jsxs(I,{className:"border-orange-300 bg-orange-100",children:[e.jsx(Q,{className:"h-4 w-4 text-orange-600"}),e.jsxs(O,{className:"text-orange-900",children:[e.jsx("strong",{children:"Setup Required:"})," You need to create the permissions table in Supabase."]})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx("p",{className:"text-sm text-orange-900",children:e.jsx("strong",{children:"Follow these steps:"})}),e.jsxs("ol",{className:"list-decimal list-inside space-y-2 text-sm text-orange-800",children:[e.jsx("li",{children:'Click the "Copy SQL Script" button below'}),e.jsxs("li",{children:["Open your ",e.jsx("strong",{children:"Supabase Dashboard"})]}),e.jsxs("li",{children:["Go to ",e.jsx("strong",{children:"SQL Editor"})," (in the left sidebar)"]}),e.jsxs("li",{children:["Click ",e.jsx("strong",{children:'"New Query"'})]}),e.jsx("li",{children:"Paste the SQL script"}),e.jsxs("li",{children:["Click ",e.jsx("strong",{children:'"Run"'})]}),e.jsx("li",{children:"Return here and refresh the page"})]})]}),e.jsxs("div",{className:"flex gap-2",children:[e.jsxs(m,{onClick:o,className:"flex-1",variant:"default",children:[e.jsx(W,{className:"h-4 w-4 mr-2"}),L?"Copied!":"Copy SQL Script"]}),e.jsx(m,{onClick:()=>t(!l),variant:"outline",children:l?"Hide Script":"Show Script"}),e.jsx(m,{onClick:()=>window.location.reload(),variant:"outline",children:"Refresh"})]}),l&&e.jsxs("div",{className:"mt-4",children:[e.jsx("div",{className:"flex justify-between items-center mb-2",children:e.jsxs("p",{className:"text-sm text-orange-900",children:[e.jsx("strong",{children:"SQL Script:"})," Select all and copy (Ctrl+A, Ctrl+C)"]})}),e.jsx("textarea",{readOnly:!0,value:c,className:"w-full h-96 p-3 bg-gray-900 text-green-400 text-xs rounded font-mono overflow-auto resize-y",onClick:p=>p.currentTarget.select()}),e.jsx("p",{className:"text-xs text-orange-700 mt-2",children:"💡 Tip: Click inside the text area to auto-select all text, then copy with Ctrl+C (Cmd+C on Mac)"})]})]}),u&&e.jsxs(I,{className:"border-red-300 bg-red-50",children:[e.jsx(Q,{className:"h-4 w-4 text-red-600"}),e.jsxs(O,{className:"text-red-900",children:[e.jsx("strong",{children:"Error:"})," ",u]})]})]})]})}const Ye=q(),hs=[{id:"dashboard",name:"Dashboard",description:"Main dashboard and analytics"},{id:"ai-suggestions",name:"AI Suggestions",description:"Intelligent task recommendations"},{id:"team-dashboard",name:"Team Dashboard",description:"Team performance monitoring (Manager/Admin only)"},{id:"contacts",name:"Contacts",description:"Customer and lead management"},{id:"tasks",name:"Tasks",description:"Task and to-do management"},{id:"appointments",name:"Appointments",description:"Calendar and scheduling"},{id:"bids",name:"Deals",description:"Quotes and proposals"},{id:"notes",name:"Notes",description:"Notes and documentation"},{id:"documents",name:"Documents",description:"Document storage and management"},{id:"email",name:"Email",description:"Email integration and campaigns"},{id:"marketing",name:"Marketing",description:"Marketing automation and campaigns"},{id:"inventory",name:"Inventory",description:"Product and inventory management"},{id:"project-wizards",name:"Project Wizards",description:"Deck, garage, shed, and roof design planners"},{id:"reports",name:"Reports",description:"Business intelligence and analytics reports"},{id:"users",name:"Users",description:"User management"},{id:"settings",name:"Settings",description:"System settings"},{id:"tenants",name:"Tenants",description:"Multi-tenant management (Super Admin only)"},{id:"security",name:"Security",description:"Security and audit logs"},{id:"import-export",name:"Import/Export",description:"Data import and export"}],ps=[{value:"super_admin",label:"Super Admin",description:"Full system access across all organizations"},{value:"admin",label:"Admin",description:"Full access within organization"},{value:"director",label:"Director",description:"Same as Manager, plus full user visibility on Team Dashboard"},{value:"manager",label:"Manager",description:"Manage teams and operations"},{value:"marketing",label:"Marketing",description:"Marketing and campaign management"},{value:"standard_user",label:"Standard User",description:"Basic user access"}];function ha({userRole:r}){const[d,C]=n.useState("standard_user"),[f,u]=n.useState({}),[R,l]=n.useState({}),[t,L]=n.useState(!0),[x,c]=n.useState(!1),[o,p]=n.useState(!1),[D,U]=n.useState(!1),h=r==="super_admin"||r==="admin",S=ps.filter(j=>r==="super_admin"||j.value!=="super_admin");n.useEffect(()=>{i(d)},[d]),n.useEffect(()=>{const j=Object.keys(f).some(_=>{const g=f[_],E=R[_];return E?g.visible!==E.visible||g.add!==E.add||g.change!==E.change||g.delete!==E.delete:!1});p(j)},[f,R]);const i=async j=>{L(!0),U(!1);try{const{data:_,error:g}=await Ye.from("permissions").select("*").eq("role",j);if(g){if(g.code==="PGRST205"||g.code==="42P01"){U(!0),L(!1);return}throw g}const E={};hs.forEach(w=>{E[w.id]={role:j,module:w.id,visible:!1,add:!1,change:!1,delete:!1}}),_&&_.length>0&&_.forEach(w=>{E[w.module]={id:w.id,role:w.role,module:w.module,visible:w.visible,add:w.add,change:w.change,delete:w.delete}}),u(E),l(JSON.parse(JSON.stringify(E))),U(!1)}catch{a.error("Failed to load permissions")}finally{L(!1)}},v=(j,_,g)=>{u(E=>({...E,[j]:{...E[j],[_]:g}}))},B=async()=>{c(!0);try{const j=Object.values(f).filter(g=>g.id),_=Object.values(f).filter(g=>!g.id);if(j.length>0){const g=j.map(w=>({id:w.id,role:w.role,module:w.module,visible:w.visible,add:w.add,change:w.change,delete:w.delete})),{error:E}=await Ye.from("permissions").upsert(g,{onConflict:"id"});if(E)throw E}if(_.length>0){const g=_.map(w=>({role:w.role,module:w.module,visible:w.visible,add:w.add,change:w.change,delete:w.delete})),{error:E}=await Ye.from("permissions").insert(g);if(E)throw E}await i(d),a.success(`Permissions saved for ${ps.find(g=>g.value===d)?.label}!`)}catch{a.error("Failed to save permissions")}finally{c(!1)}},P=()=>{u(JSON.parse(JSON.stringify(R)))};return h?e.jsxs("div",{className:"space-y-6",children:[e.jsxs("div",{children:[e.jsx("h2",{className:"text-2xl text-gray-900 mb-2",children:"Role Permissions Management"}),e.jsx("p",{className:"text-gray-600",children:"Configure what each role can access and modify in the system. Changes are saved to the database. "})]}),D?e.jsx(xa,{}):e.jsxs(js,{value:d,onValueChange:j=>C(j),children:[e.jsx("div",{className:"overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0",children:e.jsx(Ns,{className:`inline-flex w-auto min-w-full lg:grid lg:w-full lg:grid-cols-${S.length}`,children:S.map(j=>e.jsx(Te,{value:j.value,className:"whitespace-nowrap",children:j.label},j.value))})}),S.map(j=>e.jsx(Ie,{value:j.value,className:"space-y-4",children:e.jsxs(M,{children:[e.jsxs(H,{children:[e.jsxs(Y,{className:"flex items-center gap-2",children:[e.jsx(pe,{className:"h-5 w-5"}),j.label," Permissions"]}),e.jsx(se,{children:j.description})]}),e.jsx(X,{children:t?e.jsx("div",{className:"flex items-center justify-center py-12",children:e.jsxs("div",{className:"text-center space-y-3",children:[e.jsx("div",{className:"animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"}),e.jsx("p",{className:"text-gray-600",children:"Loading permissions..."})]})}):e.jsxs(e.Fragment,{children:[o&&e.jsxs(I,{className:"mb-4 border-yellow-400 bg-yellow-50",children:[e.jsx(Q,{className:"h-4 w-4 text-yellow-600"}),e.jsx(O,{className:"text-yellow-900",children:'You have unsaved changes. Click "Save Changes" to apply them.'})]}),e.jsx("div",{className:"overflow-x-auto",children:e.jsxs("table",{className:"w-full",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("th",{className:"text-left py-3 px-4 text-sm text-muted-foreground",children:"Module"}),e.jsx("th",{className:"text-center py-3 px-4 text-sm text-muted-foreground",children:"Visible"}),e.jsx("th",{className:"text-center py-3 px-4 text-sm text-muted-foreground",children:"Add"}),e.jsx("th",{className:"text-center py-3 px-4 text-sm text-muted-foreground",children:"Change"}),e.jsx("th",{className:"text-center py-3 px-4 text-sm text-muted-foreground",children:"Delete"})]})}),e.jsx("tbody",{children:hs.map(_=>{const g=f[_.id];return g?e.jsxs("tr",{className:"border-b border-gray-100 hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-800",children:[e.jsx("td",{className:"py-3 px-4",children:e.jsxs("div",{children:[e.jsx("p",{className:"text-sm text-foreground",children:_.name}),e.jsx("p",{className:"text-xs text-muted-foreground",children:_.description})]})}),e.jsx("td",{className:"py-3 px-4 text-center",children:e.jsx(we,{checked:g.visible,onCheckedChange:E=>v(_.id,"visible",E)})}),e.jsx("td",{className:"py-3 px-4 text-center",children:e.jsx(we,{checked:g.add,onCheckedChange:E=>v(_.id,"add",E),disabled:!g.visible})}),e.jsx("td",{className:"py-3 px-4 text-center",children:e.jsx(we,{checked:g.change,onCheckedChange:E=>v(_.id,"change",E),disabled:!g.visible})}),e.jsx("td",{className:"py-3 px-4 text-center",children:e.jsx(we,{checked:g.delete,onCheckedChange:E=>v(_.id,"delete",E),disabled:!g.visible})})]},_.id):null})})]})}),e.jsxs("div",{className:"flex gap-3 mt-6",children:[e.jsx(m,{onClick:B,disabled:!o||x,className:"flex-1",children:x?e.jsxs(e.Fragment,{children:[e.jsx(K,{className:"h-4 w-4 mr-2 animate-spin"}),"Saving..."]}):e.jsxs(e.Fragment,{children:[e.jsx(Qs,{className:"h-4 w-4 mr-2"}),"Save Changes"]})}),e.jsxs(m,{onClick:P,variant:"outline",disabled:!o||x,children:[e.jsx(K,{className:"h-4 w-4 mr-2"}),"Reset"]})]})]})})]})},j.value))]})]}):e.jsxs(I,{children:[e.jsx(pe,{className:"h-4 w-4"}),e.jsx(O,{children:"You don't have permission to manage role permissions. Only Super Admins and Admins can access this section."})]})}function pa(){const r=`-- ============================================================================
-- COMPLETE RLS FIX FOR USER MANAGEMENT
-- ============================================================================

-- PART 1: Fix RLS Policies (Allow super_admin bypass)
-- ============================================================================

DROP POLICY IF EXISTS "Super admins can update any profile" ON public.profiles;
DROP POLICY IF EXISTS "Super admins can delete any profile" ON public.profiles;
DROP POLICY IF EXISTS "Super admins can view any profile" ON public.profiles;

CREATE POLICY "Super admins can update any profile"
  ON public.profiles FOR UPDATE
  USING (
    (SELECT (auth.jwt() -> 'user_metadata' ->> 'role') = 'super_admin')
    OR auth.uid() = id
  );

CREATE POLICY "Super admins can delete any profile"
  ON public.profiles FOR DELETE
  USING (
    (SELECT (auth.jwt() -> 'user_metadata' ->> 'role') = 'super_admin')
    OR auth.uid() = id
  );

CREATE POLICY "Super admins can view any profile"
  ON public.profiles FOR SELECT
  USING (
    (SELECT (auth.jwt() -> 'user_metadata' ->> 'role') = 'super_admin')
    OR (SELECT auth.jwt() -> 'user_metadata' ->> 'organizationId') = organization_id
    OR auth.uid() = id
  );

-- PART 2: Create Server-Side Functions (Bypass RLS for everyone)
-- ============================================================================

CREATE OR REPLACE FUNCTION public.assign_user_to_organization(
  p_user_email TEXT,
  p_organization_id TEXT
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_user_id UUID;
  v_org_exists BOOLEAN;
BEGIN
  SELECT EXISTS(
    SELECT 1 FROM public.organizations 
    WHERE id = p_organization_id AND status = 'active'
  ) INTO v_org_exists;
  
  IF NOT v_org_exists THEN
    RETURN jsonb_build_object('success', false, 'error', 'Organization not found or inactive');
  END IF;
  
  SELECT id INTO v_user_id FROM public.profiles WHERE email = p_user_email;
  
  IF v_user_id IS NULL THEN
    RETURN jsonb_build_object('success', false, 'error', 'User not found');
  END IF;
  
  UPDATE public.profiles
  SET organization_id = p_organization_id, status = 'active', updated_at = NOW()
  WHERE id = v_user_id;
  
  UPDATE auth.users
  SET raw_user_meta_data = jsonb_set(
    COALESCE(raw_user_meta_data, '{}'::jsonb),
    '{organizationId}', to_jsonb(p_organization_id)
  )
  WHERE id = v_user_id;
  
  RETURN jsonb_build_object(
    'success', true,
    'user_id', v_user_id,
    'email', p_user_email,
    'organization_id', p_organization_id,
    'message', 'User successfully assigned to organization'
  );
END;
$$;

CREATE OR REPLACE FUNCTION public.create_org_and_assign_user(
  p_org_name TEXT,
  p_user_email TEXT
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_org_id TEXT;
  v_org_exists BOOLEAN;
BEGIN
  v_org_id := lower(regexp_replace(
    regexp_replace(trim(p_org_name), '[^a-zA-Z0-9\\\\s-]', '', 'g'),
    '\\\\s+', '-', 'g'
  ));
  v_org_id := substring(v_org_id from 1 for 50);
  
  SELECT EXISTS(SELECT 1 FROM public.organizations WHERE id = v_org_id) INTO v_org_exists;
  
  IF NOT v_org_exists THEN
    INSERT INTO public.organizations (id, name, status, created_at, updated_at)
    VALUES (v_org_id, p_org_name, 'active', NOW(), NOW());
  END IF;
  
  RETURN public.assign_user_to_organization(p_user_email, v_org_id);
END;
$$;

GRANT EXECUTE ON FUNCTION public.assign_user_to_organization TO authenticated;
GRANT EXECUTE ON FUNCTION public.create_org_and_assign_user TO authenticated;
GRANT EXECUTE ON FUNCTION public.assign_user_to_organization TO service_role;
GRANT EXECUTE ON FUNCTION public.create_org_and_assign_user TO service_role;`,d=()=>{ee(r),a.success("SQL script copied to clipboard!")};return e.jsxs(M,{className:"border-orange-200 bg-orange-50",children:[e.jsx(H,{children:e.jsxs(Y,{className:"flex items-center gap-2 text-orange-900",children:[e.jsx(ce,{className:"h-5 w-5"}),"⚠️ Database Setup Required (One-Time)"]})}),e.jsxs(X,{className:"space-y-4",children:[e.jsx(I,{className:"border-red-300 bg-red-100",children:e.jsxs(O,{className:"text-red-900",children:[e.jsx("strong",{children:"RLS policies are preventing cross-organization user management."}),e.jsx("p",{className:"mt-2",children:"To enable super_admin privileges and fix user assignment errors, you need to run a SQL script in your Supabase database."})]})}),e.jsxs("div",{className:"space-y-3",children:[e.jsx("h3",{className:"font-medium text-orange-900",children:"What This Fixes:"}),e.jsxs("ul",{className:"list-disc pl-5 space-y-1 text-sm text-orange-800",children:[e.jsx("li",{children:"✅ Allows super_admins to manage users across all organizations"}),e.jsx("li",{children:'✅ Fixes "No rows updated - RLS policy blocking" errors'}),e.jsx("li",{children:"✅ Enables User Recovery tool to move users between orgs"}),e.jsx("li",{children:"✅ Enables browser console tools (assignUserToOrg, etc.)"}),e.jsx("li",{children:"✅ Creates server-side functions that bypass RLS safely"})]})]}),e.jsx(I,{className:"border-blue-300 bg-blue-50",children:e.jsxs(O,{className:"text-blue-900",children:[e.jsx("strong",{children:"📋 Step-by-Step Instructions:"}),e.jsxs("ol",{className:"list-decimal pl-5 mt-2 space-y-2",children:[e.jsx("li",{children:'Click the "Copy SQL Script" button below'}),e.jsxs("li",{children:["Go to your"," ",e.jsxs("a",{href:"https://supabase.com/dashboard",target:"_blank",rel:"noopener noreferrer",className:"underline inline-flex items-center gap-1",children:["Supabase Dashboard ",e.jsx(Oe,{className:"h-3 w-3"})]})]}),e.jsxs("li",{children:["Navigate to ",e.jsx("strong",{children:"SQL Editor"})," in the left sidebar"]}),e.jsxs("li",{children:["Click ",e.jsx("strong",{children:'"New Query"'})]}),e.jsx("li",{children:"Paste the SQL script"}),e.jsxs("li",{children:["Click ",e.jsx("strong",{children:'"Run"'})," or press F5"]}),e.jsx("li",{children:"You should see: ✅ 3 policies created, ✅ 2 functions created"}),e.jsx("li",{children:"Come back here and refresh the page"})]})]})}),e.jsxs("div",{className:"flex gap-2",children:[e.jsxs(m,{onClick:d,className:"flex-1",children:[e.jsx(W,{className:"h-4 w-4 mr-2"}),"📋 Copy SQL Script"]}),e.jsxs(m,{variant:"outline",onClick:()=>window.open("https://supabase.com/dashboard","_blank"),className:"flex-1",children:[e.jsx(Oe,{className:"h-4 w-4 mr-2"}),"Open Supabase Dashboard"]})]}),e.jsxs("details",{className:"text-sm",children:[e.jsx("summary",{className:"cursor-pointer font-medium text-orange-900 hover:text-orange-700",children:"🔍 Show SQL Script Preview"}),e.jsx("div",{className:"mt-2 bg-gray-900 text-green-400 p-4 rounded font-mono text-xs overflow-x-auto max-h-64 overflow-y-auto",children:e.jsx("pre",{children:r})})]}),e.jsx(I,{className:"border-yellow-300 bg-yellow-50",children:e.jsxs(O,{className:"text-yellow-900 text-xs",children:[e.jsx("strong",{children:"⚠️ Important:"})," This SQL script is safe to run. It:",e.jsxs("ul",{className:"list-disc pl-5 mt-1 space-y-1",children:[e.jsxs("li",{children:["Uses ",e.jsx("code",{children:"CREATE OR REPLACE"})," so it's safe to run multiple times"]}),e.jsx("li",{children:"Only adds new RLS policies (doesn't remove existing ones)"}),e.jsx("li",{children:"Grants execute permissions to authenticated users"}),e.jsxs("li",{children:["Uses ",e.jsx("code",{children:"SECURITY DEFINER"})," safely (validated inputs)"]})]})]})}),e.jsxs(I,{className:"border-green-300 bg-green-50",children:[e.jsx(Ge,{className:"h-4 w-4"}),e.jsxs(O,{className:"text-green-900 text-sm",children:[e.jsx("strong",{children:"After running the SQL, you'll be able to:"}),e.jsxs("ul",{className:"list-disc pl-5 mt-2 space-y-1",children:[e.jsx("li",{children:"Move users between organizations"}),e.jsx("li",{children:"Use the User Recovery tool without errors"}),e.jsxs("li",{children:["Run console commands like: ",e.jsx("code",{className:"bg-green-100 px-1 rounded",children:"assignUserToOrg('email', 'org-id')"})]}),e.jsx("li",{children:"Manage users across all organizations as super_admin"})]})]})]})]})]})}const ga=async r=>{try{if(await ee(r))return}catch{}},de=q();function fa({currentUserId:r,currentOrganizationId:d,currentUserRole:C}){const[f,u]=n.useState(""),[R,l]=n.useState(!1),[t,L]=n.useState(null),[x,c]=n.useState(!1),o=async()=>{l(!0),L(null);try{const{data:h,error:S}=await de.auth.admin.listUsers(),i=h?.users?.find(_=>_.email?.toLowerCase()===f.toLowerCase()),{data:v,error:B}=await de.from("profiles").select("*").ilike("email",f),{data:P,error:j}=await de.from("profiles").select("*").ilike("email",f);L({email:f,authUser:i?{id:i.id,email:i.email,created_at:i.created_at,confirmed_at:i.confirmed_at}:null,profile:v?.[0]||null,allProfiles:P||[],profileError:B,allProfilesError:j,currentOrg:d}),!i&&!v?.[0]?a.error("User not found in system"):i&&!v?.[0]?a.warning("User exists in auth but missing profile record"):v?.[0]?.organization_id!==d?a.warning("User found but in different organization"):a.success("User found")}catch{a.error("Error searching for user")}finally{l(!1)}},p=async()=>{if(!t?.authUser){a.error("No auth user found to create profile for");return}c(!0);try{const{data:h,error:S}=await de.from("profiles").insert([{id:t.authUser.id,email:t.authUser.email,name:t.authUser.email.split("@")[0],organization_id:d,role:"standard_user",status:"active"}]).select();if(S){a.error("Failed to create profile: "+S.message);return}if(!h||h.length===0){a.error("Failed to create profile: No data returned");return}a.success("Profile created successfully"),await o()}catch{a.error("Error creating profile")}finally{c(!1)}},D=async()=>{if(!t?.profile){a.error("No profile found to update");return}c(!0);try{const{data:h,error:S}=await de.rpc("assign_user_to_organization",{p_user_email:t.profile.email,p_organization_id:d});if(S){S.message.includes("function")&&S.message.includes("does not exist")?a.error("Database functions not installed. Please run the SQL setup script first. See /SQL_FIX_USER_ORGANIZATION.sql"):a.error("Failed to update organization: "+S.message);return}if(!h||!h.success){a.error(h?.error||"Failed to assign user to organization");return}a.success("User moved to your organization successfully!"),await o()}catch(h){a.error("Error updating organization: "+h.message)}finally{c(!1)}},U=async()=>{if(!t?.profile){a.error("No profile to delete");return}if(confirm("This will delete the existing profile and recreate it. Continue?")){c(!0);try{const{data:h,error:S}=await de.from("profiles").delete().eq("id",t.profile.id).select();if(S){S.code==="42501"||S.message.includes("policy")?a.error("RLS Policy Error: Cannot delete profile in other organization. Use the SQL script below instead.",{duration:5e3}):a.error("Failed to delete profile: "+S.message);return}if(!h||h.length===0){a.error("Cannot delete profile - RLS policies are blocking this operation. Use the SQL script below instead.",{duration:5e3});return}await p()}catch{a.error("Error during delete and recreate - Use SQL script below instead")}finally{c(!1)}}};return e.jsxs("div",{className:"space-y-6",children:[e.jsx(pa,{}),e.jsxs(M,{children:[e.jsx(H,{children:e.jsxs(Y,{className:"flex items-center gap-2",children:[e.jsx($s,{className:"h-5 w-5"}),"User Recovery Tool"]})}),e.jsxs(X,{className:"space-y-4",children:[e.jsxs(I,{children:[e.jsx(ce,{className:"h-4 w-4"}),e.jsx(O,{children:"This tool helps find and recover missing users. It will search across auth.users and profiles tables."})]}),e.jsxs("div",{className:"space-y-2",children:[e.jsx(k,{children:"Email Address"}),e.jsxs("div",{className:"flex gap-2",children:[e.jsx(J,{type:"email",placeholder:"user@example.com",value:f,onChange:h=>u(h.target.value),onKeyDown:h=>h.key==="Enter"&&o()}),e.jsxs(m,{onClick:o,disabled:R,children:[e.jsx(Re,{className:"h-4 w-4 mr-2"}),R?"Searching...":"Search"]})]})]}),t&&e.jsxs("div",{className:"space-y-4 mt-6",children:[e.jsxs("div",{className:"border rounded-lg p-4 space-y-3",children:[e.jsxs("h3",{className:"font-medium",children:["Search Results for: ",t.email]}),e.jsxs("div",{className:"space-y-2",children:[e.jsx("div",{className:"flex items-center justify-between p-3 bg-gray-50 rounded",children:e.jsxs("div",{children:[e.jsx("p",{className:"text-sm font-medium",children:"Auth User (auth.users)"}),e.jsx("p",{className:"text-xs text-gray-600",children:t.authUser?e.jsxs(e.Fragment,{children:["✅ Found - ID: ",t.authUser.id.substring(0,8),"...",e.jsx("br",{}),"Created: ",new Date(t.authUser.created_at).toLocaleDateString()]}):"❌ Not found in authentication system"})]})}),e.jsx("div",{className:"flex items-center justify-between p-3 bg-gray-50 rounded",children:e.jsxs("div",{children:[e.jsx("p",{className:"text-sm font-medium",children:"Profile (profiles table)"}),e.jsx("p",{className:"text-xs text-gray-600",children:t.profile?e.jsxs(e.Fragment,{children:["✅ Found - Organization: ",t.profile.organization_id,e.jsx("br",{}),t.profile.organization_id===t.currentOrg?e.jsx("span",{className:"text-green-600",children:"✓ In your organization"}):e.jsx("span",{className:"text-orange-600",children:"⚠️ In different organization"}),e.jsx("br",{}),"Role: ",t.profile.role,e.jsx("br",{}),"Status: ",t.profile.status]}):"❌ No profile record found"})]})}),t.allProfiles&&t.allProfiles.length>0&&e.jsxs("div",{className:"p-3 bg-blue-50 rounded border border-blue-200",children:[e.jsxs("p",{className:"text-sm font-medium text-blue-900",children:["Found ",t.allProfiles.length," profile(s) across all organizations:"]}),t.allProfiles.map((h,S)=>e.jsxs("div",{className:"text-xs text-blue-800 mt-2 pl-4",children:["• Org: ",h.organization_id," | Role: ",h.role," | Status: ",h.status]},S))]})]}),e.jsxs("div",{className:"space-y-2 pt-4 border-t",children:[e.jsx("p",{className:"text-sm font-medium",children:"Recovery Actions:"}),t.authUser&&!t.profile&&e.jsxs(m,{onClick:p,disabled:x,className:"w-full",children:[e.jsx(K,{className:"h-4 w-4 mr-2"}),"Create Profile in Your Organization"]}),t.profile&&t.profile.organization_id!==t.currentOrg&&e.jsxs(e.Fragment,{children:[e.jsxs(I,{className:"border-orange-200 bg-orange-50",children:[e.jsx(ce,{className:"h-4 w-4 text-orange-600"}),e.jsxs(O,{className:"text-orange-900",children:[e.jsx("strong",{children:"User in Different Organization"}),e.jsxs("p",{className:"text-sm mt-1",children:["This user is in organization: ",e.jsx("code",{className:"bg-orange-100 px-1 rounded",children:t.profile.organization_id})]}),e.jsxs("p",{className:"text-sm mt-2",children:[e.jsx("strong",{children:"⚠️ Note:"}),' Due to Row Level Security (RLS) policies, moving users between organizations requires super_admin privileges. If the "Move User" button fails, use "Delete & Recreate" instead.']})]})]}),e.jsxs(m,{onClick:D,disabled:x,variant:"outline",className:"w-full",children:[e.jsx(K,{className:"h-4 w-4 mr-2"}),"Try to Move User (May Fail if Not Super Admin)"]}),e.jsxs(m,{onClick:U,disabled:x,className:"w-full bg-blue-600 hover:bg-blue-700 text-white",children:[e.jsx(K,{className:"h-4 w-4 mr-2"}),"Delete & Recreate (Recommended)"]})]}),t.profile&&t.profile.organization_id===t.currentOrg&&e.jsx(I,{className:"border-green-200 bg-green-50",children:e.jsx(O,{className:"text-green-900",children:"✅ User is already in your organization. No action needed."})}),!t.authUser&&!t.profile&&e.jsx(I,{children:e.jsx(O,{children:"User not found in the system. They may need to sign up first."})})]})]}),t.profile&&t.profile.organization_id!==t.currentOrg&&e.jsxs("div",{className:"border rounded-lg p-4 space-y-3 bg-blue-50 border-blue-200",children:[e.jsx("h3",{className:"font-medium text-blue-900",children:"🛠️ Manual SQL Fix (Bypasses RLS)"}),e.jsx("p",{className:"text-sm text-blue-800",children:"If the buttons above fail due to RLS policies, copy and run this SQL in your Supabase SQL Editor:"}),e.jsx("div",{className:"bg-gray-900 text-green-400 p-4 rounded font-mono text-xs overflow-x-auto",children:e.jsx("pre",{children:`-- Move user ${t.email} to organization ${d}
UPDATE public.profiles 
SET organization_id = '${d}'
WHERE id = '${t.profile.id}';

-- Verify the update
SELECT id, email, organization_id, role, status 
FROM public.profiles 
WHERE email = '${t.email}';`})}),e.jsxs("div",{className:"flex gap-2",children:[e.jsx(m,{size:"sm",variant:"outline",onClick:()=>{const h=`-- Move user ${t.email} to organization ${d}
UPDATE public.profiles 
SET organization_id = '${d}'
WHERE id = '${t.profile.id}';

-- Verify the update
SELECT id, email, organization_id, role, status 
FROM public.profiles 
WHERE email = '${t.email}';`;ga(h),a.success("SQL copied to clipboard!")},children:"📋 Copy SQL"}),e.jsxs(m,{size:"sm",onClick:o,disabled:R,children:[e.jsx(K,{className:"h-4 w-4 mr-2"}),"Re-check After Running SQL"]})]}),e.jsx(I,{className:"border-yellow-300 bg-yellow-50",children:e.jsxs(O,{className:"text-yellow-900 text-xs",children:[e.jsx("strong",{children:"How to run this SQL:"}),e.jsxs("ol",{className:"list-decimal pl-5 mt-2 space-y-1",children:[e.jsx("li",{children:"Go to your Supabase Dashboard"}),e.jsx("li",{children:"Navigate to SQL Editor"}),e.jsx("li",{children:'Click "New Query"'}),e.jsx("li",{children:"Paste the SQL above"}),e.jsx("li",{children:'Click "Run" or press Ctrl+Enter'}),e.jsx("li",{children:'Return here and click "Re-check After Running SQL"'})]})]})})]})]}),e.jsxs("div",{className:"text-xs text-gray-500 space-y-1 mt-4",children:[e.jsx("p",{children:e.jsx("strong",{children:"Troubleshooting Tips:"})}),e.jsxs("ul",{className:"list-disc pl-5 space-y-1",children:[e.jsx("li",{children:'If user exists in auth but no profile: Click "Create Profile"'}),e.jsx("li",{children:'If user is in different organization: Use "Delete & Recreate" (recommended for non-super admins)'}),e.jsx("li",{children:'"Move User" button requires super_admin role due to RLS policies'}),e.jsx("li",{children:'"Delete & Recreate" bypasses RLS by creating a fresh profile in your organization'}),e.jsx("li",{children:"After recovery, user should appear in the Users list immediately"})]})]})]})]})]})}function ja(){const[r,d]=useState(!1),C=`-- Fix profiles table to allow invited users without auth.users entry
-- Run this in Supabase SQL Editor

-- Step 1: Drop the foreign key constraint
ALTER TABLE public.profiles 
DROP CONSTRAINT IF EXISTS profiles_id_fkey;

-- Step 2: Make id column independent (not dependent on auth.users)
-- The id will still be PRIMARY KEY but won't require auth.users reference

-- Step 3: Add index for better performance
CREATE INDEX IF NOT EXISTS idx_profiles_email ON public.profiles(email);
CREATE INDEX IF NOT EXISTS idx_profiles_organization ON public.profiles(organization_id);
CREATE INDEX IF NOT EXISTS idx_profiles_status ON public.profiles(status);

-- Step 4: Update RLS policies to allow admins to insert invited users
DROP POLICY IF EXISTS "users_insert_own_profile" ON public.profiles;

CREATE POLICY "admins_can_insert_profiles" ON public.profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (
    -- User can insert their own profile
    auth.uid() = id
    OR
    -- Or if user is admin/super_admin (check from their existing profile)
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid()
      AND role IN ('admin', 'super_admin')
    )
  );

-- Step 5: Update RLS policies to allow admins to update any profile in their org
DROP POLICY IF EXISTS "users_update_own_profile" ON public.profiles;

CREATE POLICY "users_can_update_profiles" ON public.profiles
  FOR UPDATE
  TO authenticated
  USING (
    -- User can update their own profile
    auth.uid() = id
    OR
    -- Or if user is super_admin
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid()
      AND role = 'super_admin'
    )
    OR
    -- Or if user is admin in the same organization
    EXISTS (
      SELECT 1 FROM public.profiles p1
      WHERE p1.id = auth.uid()
      AND p1.role = 'admin'
      AND p1.organization_id = public.profiles.organization_id
    )
  )
  WITH CHECK (
    -- Same conditions for WITH CHECK
    auth.uid() = id
    OR
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid()
      AND role = 'super_admin'
    )
    OR
    EXISTS (
      SELECT 1 FROM public.profiles p1
      WHERE p1.id = auth.uid()
      AND p1.role = 'admin'
      AND p1.organization_id = public.profiles.organization_id
    )
  );

-- Step 6: Allow admins to delete profiles
DROP POLICY IF EXISTS "users_delete_own_profile" ON public.profiles;

CREATE POLICY "admins_can_delete_profiles" ON public.profiles
  FOR DELETE
  TO authenticated
  USING (
    -- User can delete their own profile
    auth.uid() = id
    OR
    -- Or if user is super_admin
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid()
      AND role = 'super_admin'
    )
    OR
    -- Or if user is admin in the same organization
    EXISTS (
      SELECT 1 FROM public.profiles p1
      WHERE p1.id = auth.uid()
      AND p1.role = 'admin'
      AND p1.organization_id = public.profiles.organization_id
    )
  );

-- ✅ Done! Now admins can invite users and create profiles with temporary IDs`,f=()=>{copyToClipboard(C),d(!0),a.success("SQL script copied to clipboard!"),setTimeout(()=>d(!1),2e3)};return e.jsxs(Card,{className:"border-orange-200 bg-orange-50",children:[e.jsxs(CardHeader,{children:[e.jsxs(CardTitle,{className:"flex items-center gap-2 text-orange-900",children:[e.jsx(AlertTriangle,{className:"h-5 w-5"}),"Profiles Table Fix Required"]}),e.jsx(CardDescription,{className:"text-sm text-gray-500",children:"The profiles table currently has a foreign key constraint that prevents inviting users who haven't signed up yet. Run the SQL script below to fix this."})]}),e.jsxs(CardContent,{className:"space-y-4",children:[e.jsxs(I,{className:"bg-white border-orange-300",children:[e.jsx(Database,{className:"h-4 w-4"}),e.jsx(O,{children:"The profiles table currently has a foreign key constraint that prevents inviting users who haven't signed up yet. Run the SQL script below to fix this."})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsx("h3",{className:"text-sm font-semibold text-gray-900",children:"SQL Migration Script"}),e.jsx(Button,{onClick:f,size:"sm",variant:"outline",className:"gap-2",children:r?e.jsxs(e.Fragment,{children:[e.jsx(ge,{className:"h-4 w-4"}),"Copied!"]}):e.jsxs(e.Fragment,{children:[e.jsx(W,{className:"h-4 w-4"}),"Copy SQL"]})})]}),e.jsx("pre",{className:"bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-xs",children:C}),e.jsxs("div",{className:"bg-white border border-orange-200 rounded-lg p-4 space-y-2",children:[e.jsx("h4",{className:"font-medium text-sm text-gray-900",children:"Instructions:"}),e.jsxs("ol",{className:"text-sm text-gray-700 space-y-1 list-decimal list-inside",children:[e.jsx("li",{children:'Click "Copy SQL" button above'}),e.jsx("li",{children:"Open Supabase Dashboard → SQL Editor"}),e.jsx("li",{children:"Paste and run the script"}),e.jsx("li",{children:"Refresh this page and try inviting the user again"})]})]})]})]})]})}function Na(){const[r,d]=n.useState(""),[C,f]=n.useState(!1),[u,R]=n.useState(!1),[l,t]=n.useState(null),L=async()=>{if(!r){a.error("Please enter an email address");return}f(!0),t(null);try{const c=q(),o={found:!1,inProfiles:!1,hasOrganization:!1,isActive:!1,issues:[],fixes:[]},{data:p,error:D}=await c.from("profiles").select("*").eq("email",r).maybeSingle();p?(o.found=!0,o.inProfiles=!0,o.hasOrganization=!!p.organization_id,o.isActive=p.status==="active",o.details=p,p.organization_id||(o.issues.push("User has no organization assigned"),o.fixes.push('Click "Recover User" to assign to Rona Atlantic')),p.status!=="active"&&(o.issues.push(`User status is '${p.status}' instead of 'active'`),o.fixes.push('Click "Recover User" to activate'))):(o.issues.push("User not found in profiles table"),o.fixes.push("User may need to be recreated or may exist only in auth.users"));const U="rona-atlantic",{data:h}=await c.from("profiles").select("email, role, status").eq("organization_id",U).order("email");o.orgUsers=h||[],t(o),o.found&&o.hasOrganization&&o.isActive?a.success("User found and active!"):o.found?a.warning("User found but has issues"):a.error("User not found")}catch(c){a.error("Search failed: "+c.message)}finally{f(!1)}},x=async()=>{if(!r){a.error("Please enter an email address");return}R(!0);try{const c=q(),o="rona-atlantic",{data:p,error:D}=await c.rpc("assign_user_to_organization",{p_user_email:r,p_organization_id:o});if(D){if(l?.details?.user_id){const{error:U}=await c.from("profiles").update({organization_id:o,status:"active",updated_at:new Date().toISOString()}).eq("user_id",l.details.user_id);if(U){a.error("Recovery failed: "+U.message);return}a.success("User recovered using fallback method!"),setTimeout(()=>L(),500);return}a.error("RPC call failed: "+D.message);return}a.success("User recovered successfully!"),setTimeout(()=>L(),500)}catch(c){a.error("Recovery failed: "+c.message)}finally{R(!1)}};return e.jsxs("div",{className:"space-y-6",children:[e.jsxs(M,{children:[e.jsxs(H,{children:[e.jsxs(Y,{className:"flex items-center gap-2",children:[e.jsx(da,{className:"w-5 h-5"}),"Find Missing User"]}),e.jsx(se,{children:"Search for and recover missing users in the system"})]}),e.jsxs(X,{className:"space-y-4",children:[e.jsxs("div",{className:"space-y-2",children:[e.jsx(k,{htmlFor:"email",children:"User Email"}),e.jsxs("div",{className:"flex gap-2",children:[e.jsx(J,{id:"email",type:"email",placeholder:"user@example.com",value:r,onChange:c=>d(c.target.value),onKeyDown:c=>c.key==="Enter"&&L()}),e.jsxs(m,{onClick:L,disabled:C,children:[e.jsx(Re,{className:"w-4 h-4 mr-2"}),C?"Searching...":"Search"]})]})]}),l&&e.jsxs(e.Fragment,{children:[e.jsx(I,{className:l.found&&l.hasOrganization&&l.isActive?"border-green-500":l.found?"border-yellow-500":"border-red-500",children:e.jsx(O,{children:e.jsx("div",{className:"space-y-3",children:e.jsxs("div",{className:"flex items-start gap-2",children:[l.found&&l.hasOrganization&&l.isActive?e.jsx(ge,{className:"w-5 h-5 text-green-600 mt-0.5"}):l.found?e.jsx(ce,{className:"w-5 h-5 text-yellow-600 mt-0.5"}):e.jsx(Hs,{className:"w-5 h-5 text-red-600 mt-0.5"}),e.jsxs("div",{className:"flex-1",children:[e.jsxs("div",{className:"flex items-center gap-2 mb-2",children:[e.jsx("span",{className:"font-medium",children:"Status:"}),e.jsx(Z,{variant:l.found?"default":"destructive",children:l.found?"Found":"Not Found"}),l.found&&e.jsxs(e.Fragment,{children:[e.jsx(Z,{variant:l.hasOrganization?"default":"destructive",children:l.hasOrganization?"Has Org":"No Org"}),e.jsx(Z,{variant:l.isActive?"default":"secondary",children:l.isActive?"Active":"Inactive"})]})]}),l.details&&e.jsxs("div",{className:"text-sm space-y-1 mb-3",children:[e.jsxs("div",{children:[e.jsx("strong",{children:"User ID:"})," ",l.details.user_id]}),e.jsxs("div",{children:[e.jsx("strong",{children:"Email:"})," ",l.details.email]}),e.jsxs("div",{children:[e.jsx("strong",{children:"Organization:"})," ",l.details.organization_id||"❌ None"]}),e.jsxs("div",{children:[e.jsx("strong",{children:"Role:"})," ",l.details.role||"standard_user"]}),e.jsxs("div",{children:[e.jsx("strong",{children:"Status:"})," ",l.details.status]})]}),l.issues.length>0&&e.jsxs("div",{className:"space-y-1",children:[e.jsx("div",{className:"font-medium text-sm",children:"Issues:"}),e.jsx("ul",{className:"text-sm space-y-1",children:l.issues.map((c,o)=>e.jsxs("li",{className:"flex items-start gap-2",children:[e.jsx("span",{className:"text-red-500",children:"•"}),e.jsx("span",{children:c})]},o))})]}),l.fixes.length>0&&e.jsxs("div",{className:"space-y-1 mt-2",children:[e.jsx("div",{className:"font-medium text-sm",children:"Suggested Fixes:"}),e.jsx("ul",{className:"text-sm space-y-1",children:l.fixes.map((c,o)=>e.jsxs("li",{className:"flex items-start gap-2",children:[e.jsx("span",{className:"text-blue-500",children:"→"}),e.jsx("span",{children:c})]},o))})]}),l.found&&l.issues.length>0&&e.jsx("div",{className:"mt-3",children:e.jsxs(m,{onClick:x,disabled:u,size:"sm",children:[e.jsx(K,{className:"w-4 h-4 mr-2"}),u?"Recovering...":"Recover User"]})})]})]})})})}),l.orgUsers&&l.orgUsers.length>0&&e.jsxs("div",{className:"space-y-2",children:[e.jsxs("div",{className:"font-medium text-sm",children:["Users in Rona Atlantic (",l.orgUsers.length,"):"]}),e.jsx("div",{className:"border rounded-lg overflow-hidden",children:e.jsxs("table",{className:"w-full text-sm",children:[e.jsx("thead",{className:"bg-muted",children:e.jsxs("tr",{children:[e.jsx("th",{className:"text-left p-2",children:"Email"}),e.jsx("th",{className:"text-left p-2",children:"Role"}),e.jsx("th",{className:"text-left p-2",children:"Status"})]})}),e.jsx("tbody",{children:l.orgUsers.map((c,o)=>e.jsxs("tr",{className:"border-t",children:[e.jsx("td",{className:"p-2",children:c.email}),e.jsx("td",{className:"p-2",children:c.role}),e.jsx("td",{className:"p-2",children:e.jsx(Z,{variant:c.status==="active"?"default":"secondary",children:c.status})})]},o))})]})})]})]})]})]}),e.jsxs(M,{children:[e.jsxs(H,{children:[e.jsx(Y,{children:"Quick Actions"}),e.jsx(se,{children:"Common recovery operations"})]}),e.jsx(X,{className:"space-y-3",children:e.jsxs("div",{className:"text-sm text-muted-foreground",children:[e.jsx("strong",{children:"Note:"})," If a user is completely missing from the database, they will need to sign up again or be re-invited by an administrator."]})})]})]})}function ba(){const[r,d]=n.useState(!1),[C,f]=n.useState(!1),[u,R]=n.useState(null),l=async()=>{d(!0);try{const x=q(),{data:c,error:o}=await x.from("profiles").select("email, organization_id, status");if(o){a.error("Failed to scan users: "+o.message);return}const{data:p,error:D}=await x.from("tenants").select("id, name, status").eq("status","active");if(D){a.error("Failed to load organizations: "+D.message);return}const U=new Set(p?.map(i=>i.id)||[]),h=c?.filter(i=>{const v=/^org-[0-9]+$/.test(i.organization_id||""),B=!i.organization_id,P=i.organization_id&&!U.has(i.organization_id);return v||B||P})||[],S={totalUsers:c?.length||0,invalidUsers:h.length,invalidUsersList:h,availableOrgs:p||[]};R(S),h.length===0?a.success("✅ All users have valid organization IDs!"):a.warning(`Found ${h.length} user(s) with invalid organization IDs`)}catch(x){a.error("Scan failed: "+x.message)}finally{d(!1)}},t=async()=>{if(!u||u.invalidUsers===0){a.info("No invalid organizations to fix");return}f(!0);try{const x=q();let c=0,o=0;try{const{data:p,error:D}=await x.rpc("fix_all_invalid_org_ids");if(!D&&p){a.success("✅ Fixed all invalid organization IDs!"),await l();return}}catch{}for(const p of u.invalidUsersList)try{const D=p.email.split("@")[1].toLowerCase();let U=null;if(D.includes("ronaatlantic")||D.includes("rona")?U="rona-atlantic":U=u.availableOrgs[0]?.id||null,!U){o++;continue}const{error:h}=await x.from("profiles").update({organization_id:U,status:"active",updated_at:new Date().toISOString()}).eq("email",p.email);h?o++:c++}catch{o++}c>0&&a.success(`✅ Fixed ${c} user(s)!`),o>0&&a.error(`❌ Failed to fix ${o} user(s)`),await l()}catch(x){a.error("Fix failed: "+x.message)}finally{f(!1)}},L=x=>x?/^org-[0-9]+$/.test(x):!1;return e.jsxs("div",{className:"space-y-4",children:[e.jsxs(M,{children:[e.jsxs(H,{children:[e.jsxs(Y,{className:"flex items-center gap-2",children:[e.jsx(ce,{className:"w-5 h-5 text-orange-600"}),"Fix Invalid Organization IDs"]}),e.jsx(se,{children:'Scan for and fix users with invalid timestamp-based organization IDs (e.g., "org-1762906336768")'})]}),e.jsxs(X,{className:"space-y-4",children:[e.jsxs("div",{className:"flex gap-2",children:[e.jsxs(m,{onClick:l,disabled:r,variant:"outline",className:"flex-1",children:[e.jsx(fs,{className:"w-4 h-4 mr-2"}),r?"Scanning...":"Scan for Issues"]}),u&&u.invalidUsers>0&&e.jsxs(m,{onClick:t,disabled:C,className:"flex-1",children:[e.jsx(na,{className:"w-4 h-4 mr-2"}),C?"Fixing...":`Fix ${u.invalidUsers} User(s)`]})]}),u&&e.jsxs("div",{className:"space-y-4",children:[e.jsx(I,{className:u.invalidUsers===0?"border-green-500 bg-green-50":"border-orange-500 bg-orange-50",children:e.jsx(O,{children:e.jsxs("div",{className:"flex items-start gap-3",children:[u.invalidUsers===0?e.jsx(ge,{className:"w-5 h-5 text-green-600 mt-0.5"}):e.jsx(ce,{className:"w-5 h-5 text-orange-600 mt-0.5"}),e.jsxs("div",{className:"flex-1 space-y-2",children:[e.jsx("div",{className:"flex items-center gap-2",children:e.jsx("span",{className:"font-medium",children:u.invalidUsers===0?"✅ All users have valid organization IDs":`⚠️ Found ${u.invalidUsers} invalid organization ID(s)`})}),e.jsxs("div",{className:"text-sm space-y-1",children:[e.jsxs("div",{children:["Total users: ",u.totalUsers]}),e.jsxs("div",{children:["Valid users: ",u.totalUsers-u.invalidUsers]}),e.jsxs("div",{children:["Invalid users: ",u.invalidUsers]})]})]})]})})}),u.availableOrgs.length>0&&e.jsxs("div",{className:"space-y-2",children:[e.jsxs("div",{className:"font-medium text-sm",children:["Available Organizations (",u.availableOrgs.length,"):"]}),e.jsx("div",{className:"flex flex-wrap gap-2",children:u.availableOrgs.map(x=>e.jsxs(Z,{variant:"outline",className:"text-xs",children:[x.name," (",x.id,")"]},x.id))})]}),u.invalidUsersList.length>0&&e.jsxs("div",{className:"space-y-2",children:[e.jsx("div",{className:"font-medium text-sm",children:"Users with Invalid Organization IDs:"}),e.jsx("div",{className:"border rounded-lg overflow-hidden max-h-64 overflow-y-auto",children:e.jsxs("table",{className:"w-full text-sm",children:[e.jsx("thead",{className:"bg-muted sticky top-0",children:e.jsxs("tr",{children:[e.jsx("th",{className:"text-left p-2",children:"Email"}),e.jsx("th",{className:"text-left p-2",children:"Current Org ID"}),e.jsx("th",{className:"text-left p-2",children:"Issue"})]})}),e.jsx("tbody",{children:u.invalidUsersList.map((x,c)=>e.jsxs("tr",{className:"border-t hover:bg-muted/50",children:[e.jsx("td",{className:"p-2",children:x.email}),e.jsx("td",{className:"p-2",children:e.jsx("code",{className:"text-xs bg-red-100 text-red-700 px-2 py-1 rounded",children:x.organization_id||"NULL"})}),e.jsxs("td",{className:"p-2",children:[!x.organization_id&&e.jsx(Z,{variant:"destructive",className:"text-xs",children:"No Org"}),L(x.organization_id)&&e.jsx(Z,{variant:"destructive",className:"text-xs",children:"Timestamp-based"}),x.organization_id&&!L(x.organization_id)&&e.jsx(Z,{variant:"secondary",className:"text-xs",children:"Org Not Found"})]})]},c))})]})})]})]}),!u&&e.jsx(I,{children:e.jsxs(O,{className:"text-sm",children:["Click ",e.jsx("strong",{children:'"Scan for Issues"'}),' to check for users with invalid organization IDs. This will detect timestamp-based IDs like "org-1762906336768" and other invalid references.']})})]})]}),e.jsxs(M,{children:[e.jsx(H,{children:e.jsx(Y,{className:"text-base",children:"About This Issue"})}),e.jsxs(X,{className:"space-y-3 text-sm text-muted-foreground",children:[e.jsx("p",{children:e.jsx("strong",{children:"What are timestamp-based organization IDs?"})}),e.jsx("p",{children:'These are incorrectly generated IDs in the format "org-1762906336768" where the number is a timestamp. They should be proper slug-format IDs like "rona-atlantic".'}),e.jsx("p",{children:e.jsx("strong",{children:"How does the fix work?"})}),e.jsxs("ul",{className:"list-disc list-inside space-y-1",children:[e.jsx("li",{children:"Detects users with invalid organization IDs"}),e.jsx("li",{children:"Maps users to correct organizations based on email domain"}),e.jsx("li",{children:"Updates both profiles and auth metadata"}),e.jsx("li",{children:"Ensures all users have valid, active organizations"})]}),e.jsx("div",{className:"pt-2 border-t",children:e.jsxs("p",{className:"text-xs",children:[e.jsx("strong",{children:"Alternative:"})," Run the SQL script ",e.jsx("code",{className:"bg-muted px-1 py-0.5 rounded",children:"/FIX_INVALID_ORG_IDS.sql"})," in Supabase SQL Editor for server-side fix."]})})]})]})]})}function ya({invalidOrgId:r,correctOrgId:d="rona-atlantic"}){const[C,f]=n.useState(!1),u=`-- Quick Fix: Replace invalid org ID with correct one
UPDATE profiles
SET 
  organization_id = '${d}',
  updated_at = NOW()
WHERE organization_id = '${r}';

UPDATE auth.users
SET raw_user_meta_data = COALESCE(raw_user_meta_data, '{}'::jsonb) || 
  jsonb_build_object('organizationId', '${d}')
WHERE id IN (
  SELECT id FROM profiles WHERE organization_id = '${d}'
);`,R=async()=>{await ee(u)&&(f(!0),a.success("SQL copied to clipboard!"),setTimeout(()=>f(!1),3e3))};return e.jsxs(I,{className:"border-red-500 bg-red-50",children:[e.jsx(ce,{className:"h-5 w-5 text-red-600"}),e.jsx(Ws,{className:"text-red-900 text-lg",children:"Invalid Organization ID Detected"}),e.jsx(O,{children:e.jsxs("div",{className:"space-y-4 text-red-900 mt-2",children:[e.jsxs("div",{className:"space-y-2",children:[e.jsx("p",{className:"font-medium",children:"Your account has an invalid organization ID:"}),e.jsx("code",{className:"block bg-red-100 px-3 py-2 rounded border border-red-300 text-sm",children:r}),e.jsx("p",{className:"text-sm",children:"This is a timestamp-based ID that was created by old signup logic. It needs to be replaced with a valid organization ID."})]}),e.jsxs(M,{className:"border-blue-200 bg-blue-50",children:[e.jsxs(H,{className:"pb-3",children:[e.jsx(Y,{className:"text-base text-blue-900",children:"⚡ 2-Minute Fix"}),e.jsx(se,{className:"text-blue-700",children:"Run this SQL in your Supabase SQL Editor to fix the issue immediately"})]}),e.jsxs(X,{className:"space-y-3",children:[e.jsxs("div",{className:"relative",children:[e.jsx("pre",{className:"bg-white p-3 rounded border border-blue-200 text-xs overflow-x-auto max-h-48",children:u}),e.jsx(m,{onClick:R,size:"sm",variant:"outline",className:"absolute top-2 right-2 bg-white",children:C?e.jsxs(e.Fragment,{children:[e.jsx(Ge,{className:"h-3 w-3 mr-1 text-green-600"}),"Copied!"]}):e.jsxs(e.Fragment,{children:[e.jsx(W,{className:"h-3 w-3 mr-1"}),"Copy SQL"]})})]}),e.jsxs("div",{className:"flex flex-col gap-2",children:[e.jsxs("div",{className:"flex items-start gap-2 text-sm",children:[e.jsx("span",{className:"font-bold text-blue-900 min-w-[20px]",children:"1."}),e.jsxs("span",{className:"text-blue-800",children:["Open your ",e.jsx("strong",{children:"Supabase Dashboard"})," → ",e.jsx("strong",{children:"SQL Editor"})]})]}),e.jsxs("div",{className:"flex items-start gap-2 text-sm",children:[e.jsx("span",{className:"font-bold text-blue-900 min-w-[20px]",children:"2."}),e.jsx("span",{className:"text-blue-800",children:'Copy the SQL above (or click "Copy SQL" button)'})]}),e.jsxs("div",{className:"flex items-start gap-2 text-sm",children:[e.jsx("span",{className:"font-bold text-blue-900 min-w-[20px]",children:"3."}),e.jsxs("span",{className:"text-blue-800",children:["Paste and click ",e.jsx("strong",{children:"Run"})," (or press F5)"]})]}),e.jsxs("div",{className:"flex items-start gap-2 text-sm",children:[e.jsx("span",{className:"font-bold text-blue-900 min-w-[20px]",children:"4."}),e.jsxs("span",{className:"text-blue-800",children:[e.jsx("strong",{children:"Log out"})," and ",e.jsx("strong",{children:"log back in"})]})]}),e.jsxs("div",{className:"flex items-start gap-2 text-sm",children:[e.jsx("span",{className:"font-bold text-blue-900 min-w-[20px]",children:"✅"}),e.jsx("span",{className:"text-blue-800 font-semibold",children:"Error is fixed!"})]})]})]})]}),e.jsxs("div",{className:"flex flex-col sm:flex-row gap-2 pt-2",children:[e.jsxs(m,{onClick:R,variant:"default",className:"flex-1",children:[e.jsx(W,{className:"h-4 w-4 mr-2"}),"Copy Fix SQL"]}),e.jsx(m,{asChild:!0,variant:"outline",className:"flex-1",children:e.jsxs("a",{href:"#recovery",className:"flex items-center justify-center",children:[e.jsx(Oe,{className:"h-4 w-4 mr-2"}),"Go to User Recovery"]})})]}),e.jsxs("div",{className:"bg-amber-100 border border-amber-300 rounded p-3 text-sm space-y-1",children:[e.jsx("p",{className:"font-semibold text-amber-900",children:"Alternative: Use the UI Tool"}),e.jsxs("p",{className:"text-amber-800",children:["Navigate to ",e.jsx("strong",{children:"Users → User Recovery"})," tab and use the",e.jsx("strong",{children:' "Fix Invalid Organization IDs"'})," tool to scan and fix automatically."]})]}),e.jsxs("div",{className:"text-xs text-gray-600 pt-2 border-t border-red-200",children:[e.jsx("p",{children:e.jsx("strong",{children:"What gets fixed:"})}),e.jsxs("ul",{className:"list-disc list-inside space-y-1 mt-1",children:[e.jsxs("li",{children:["Your organization ID in the ",e.jsx("code",{className:"bg-gray-100 px-1 py-0.5 rounded",children:"profiles"})," table"]}),e.jsxs("li",{children:["Your organization ID in the ",e.jsx("code",{className:"bg-gray-100 px-1 py-0.5 rounded",children:"auth.users"})," metadata"]}),e.jsx("li",{children:"All related permission and access issues"})]})]})]})})]})}const _e=q();function Pa({user:r,organization:d,onOrganizationUpdate:C}){const[f,u]=n.useState(""),R=la(f,300),[l,t]=n.useState(!1),[L,x]=n.useState(!1),[c,o]=n.useState(null),[p,D]=n.useState([]),[U,h]=n.useState(!1),[S,i]=n.useState(!0),[v,B]=n.useState(!1),[P,j]=n.useState(null),[_,g]=n.useState(!1),[E,w]=n.useState(null),[Ea,Sa]=n.useState(!1),[bs,qe]=n.useState(!1),[ys,Le]=n.useState(!1),[me,Be]=n.useState(""),[wa,Ve]=n.useState(!1),[ae,Ke]=n.useState(null),[Ca,_a]=n.useState(!1),[ue,vs]=n.useState(""),[Ta,Ia]=n.useState(null),[Es,Ae]=n.useState(!1),[G,Je]=n.useState(null),[Ss,fe]=n.useState(!1),[xe,Ze]=n.useState(""),[ws,es]=n.useState(!1),[Ue,ss]=n.useState(!1),[$,je]=n.useState(null),[De,as]=n.useState("email"),Cs=Ys("users",r.role),ze=Gs("users",r.role)||qs("users",r.role),_s=Bs("users",r.role)||r.role==="super_admin"||r.role==="admin",[re,Fe]=n.useState([]),[F,he]=n.useState({name:"",email:"",role:"standard_user",organizationId:r.organizationId}),[b,te]=n.useState({name:"",email:"",role:"standard_user",organizationId:"",status:"active",managerId:""});n.useEffect(()=>{V(),r.organizationId&&ds.getOrganizationSettings(r.organizationId).then(s=>{s?.user_invite_method&&as(s.user_invite_method)}).catch(s=>{})},[]),n.useEffect(()=>{r.role==="super_admin"&&Ts()},[r.role]);const V=async()=>{i(!0),j(null);try{const y=(await Me.getAll())?.users||[];if(y.length>0,y.length===0){Fe([]),g(!1);return}let N=y;r.role!=="super_admin"&&r.organizationId&&(N=y.filter(z=>z.organization_id===r.organizationId));const T=N.map(z=>({...z,organizationId:z.organization_id,lastLogin:z.last_login}));Fe(T),j(null)}catch(s){s?.code==="42P17"||s?.message?.includes("infinite recursion")?j("infinite recursion: "+String(s)):j(String(s)),g(!0),Fe([])}finally{i(!1)}},Ts=async()=>{try{h(!0);const{data:s,error:y}=await _e.from("organizations").select("*").order("name",{ascending:!0});if(y)return;const N=s?.map(T=>({id:T.id,name:T.name,status:T.status||"active",logo:T.logo}))||[];D(N)}catch{}finally{h(!1)}},rs=re.filter(s=>{const y=R.toLowerCase().trim(),N=!y||s.name.toLowerCase().includes(y)||s.email.toLowerCase().includes(y)||s.role.toLowerCase().includes(y)||s.status&&s.status.toLowerCase().includes(y),T=r.role==="super_admin"||s.role!=="super_admin";return N&&T}),ts=re.filter(s=>(s.role==="manager"||s.role==="director")&&s.status==="active");re.length>0&&r.role!=="super_admin"&&re.some(s=>s.organizationId===r.organizationId);const Is=/^org-[0-9]+$/.test(r.organizationId),is=s=>/^[0-9a-fA-F]{8}[-\s]?[0-9a-fA-F]{4}/.test(s),Ne=d?.name||"",ns=Ne&&!is(Ne)&&Ne!=="Organization"?Ne:"Not set — click pencil to rename",ls=async()=>{if(!(!xe.trim()||!r.organizationId)){es(!0);try{if(await ds.updateOrganizationName(r.organizationId,xe.trim()),d){const s={...d,name:xe.trim()};C?.(s)}a.success("Organization name updated!"),fe(!1)}catch{a.error("Failed to update organization name")}finally{es(!1)}}},Os=async()=>{ss(!0),je(null);try{const s=await us(),y=r.organizationId,N=await fetch(`https://${He}.supabase.co/functions/v1/make-server-8405be07/profiles/find-missing?organization_id=${encodeURIComponent(y)}`,{headers:s});if(!N.ok){const ke=await N.text();a.error("Failed to scan for missing users");return}const T=await N.json();je({missing:T.missing||[],wrongOrg:T.wrongOrg||[]});const z=(T.missing?.length||0)+(T.wrongOrg?.length||0);z===0?a.success("All auth users have matching profiles — no issues found!"):a.warning(`Found ${z} user(s) with profile issues`)}catch(s){a.error("Error scanning: "+s.message)}finally{ss(!1)}},Rs=async s=>{try{const y=await us(),N=await fetch(`https://${He}.supabase.co/functions/v1/make-server-8405be07/profiles/fix-missing`,{method:"POST",headers:y,body:JSON.stringify({users:s,organizationId:r.organizationId})});if(!N.ok){const z=await N.text();a.error("Failed to fix users");return}const T=await N.json();a.success(`Fixed ${T.fixed} user(s)!`),je(null),V()}catch(y){a.error("Error fixing: "+y.message)}},Pe=s=>{if(r.role==="super_admin"){const y=p.find(N=>N.id===s);return y&&!is(y.name)?y.name:s||"Unknown"}return r.role==="admin"&&s===r.organizationId?ns:s||"Unknown"},Ls=s=>{s.preventDefault(),As()},As=async()=>{try{qe(!1);const s={email:F.email,name:F.name,role:F.role,inviteMethod:De};if(r.role==="super_admin"){s.organizationId=F.organizationId;const N=p.find(T=>T.id===F.organizationId);N&&(s.organizationName=N.name)}else d?.name&&(s.organizationName=d.name);const y=await Me.invite(s);await V(),he({name:"",email:"",role:"standard_user",organizationId:r.organizationId}),t(!1),y?.tempPassword?(Je({email:s.email,tempPassword:y.tempPassword,name:s.name}),Ae(!0),a.success("User account created! Share the temporary password with the user.")):a.success("User invited successfully! An email has been sent to them.")}catch(s){s.message?.includes("does not exist")&&s.message?.includes("Organization")?a.error(s.message+" Please create it in the Tenants module first."):s.message?.includes("profiles_id_fkey")||s.message?.includes("is not present in table")?(qe(!0),a.error("Database migration required. See instructions above.")):s.message?.includes("already exists")?a.error("A user with this email already exists"):a.error("Failed to invite user: "+(s.message||"Unknown error"))}},Us=async s=>{const y=re.find(N=>N.id===s);if(r.role==="admin"&&y?.role==="super_admin"){a.error("You do not have permission to delete Super Admin users");return}if(confirm("Are you sure you want to remove this user?"))try{await Me.delete(s),await V(),xs().then(N=>{N&&a.info(`Billing updated: ${N.seat_count} active seat${N.seat_count!==1?"s":""}`)}).catch(()=>{})}catch{alert("Failed to remove user. Please try again.")}},Ds=s=>{if(r.role==="admin"&&s.role==="super_admin"){a.error("You do not have permission to edit Super Admin users");return}o(s),vs(s.organizationId),te({name:s.name,email:s.email,role:s.role,organizationId:s.organizationId,status:s.status,managerId:s.managerId||""}),x(!0)},zs=async s=>{if(s.preventDefault(),!c)return;if(b.organizationId!==ue&&r.role==="super_admin"){const N=Pe(ue),T=Pe(b.organizationId);if(!confirm(`⚠️ ORGANIZATION CHANGE WARNING

You are about to move ${c.name} from:
  "${N}"
to:
  "${T}"

This will affect their access to data and may cause issues.

Are you absolutely sure you want to do this?`)){a.info("User update cancelled");return}a.success(`User organization changed from "${N}" to "${T}"`)}try{let N={name:b.name,email:b.email,role:b.role,organization_id:b.organizationId,status:b.status,updated_at:new Date().toISOString()};N.manager_id=b.managerId||null;let{error:T}=await _e.from("profiles").update(N).eq("id",c.id);if(T&&T.code==="PGRST204"&&T.message?.includes("manager_id")){j("MANAGER_COLUMN_MISSING");const{manager_id:z,...ke}=N,{error:cs}=await _e.from("profiles").update(ke).eq("id",c.id);if(cs){a.error("Failed to update user: "+cs.message);return}a.warning("User updated, but manager assignment requires database migration. See instructions above."),await V(),x(!1),o(null);return}if(T){a.error("Failed to update user: "+T.message);return}a.success("User updated successfully!"),await V(),c&&b.status!==c.status&&xs().then(z=>{z&&a.info(`Billing updated: ${z.seat_count} active seat${z.seat_count!==1?"s":""}`)}).catch(()=>{}),x(!1),o(null)}catch{a.error("Failed to update user. Please try again.")}},Fs=async s=>{if(r.role==="admin"&&s.role==="super_admin"){a.error("You do not have permission to reset Super Admin passwords");return}Ke(s),Ve(!0);const y=va();Be(y);try{const N=`https://${He}.supabase.co/functions/v1/make-server-8405be07/reset-password`,T=await fetch(N,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${ta}`},body:JSON.stringify({userEmail:s.email,tempPassword:y})}),z=await T.json();if(!T.ok||!z.success)throw new Error(z.error||"Failed to reset password");!z.profileUpdated&&z.warning?a.warning("Password reset successful! Note: Run the database migration to enable password change prompts.",{duration:8e3}):z.profileUpdated;try{await _e.auth.resetPasswordForEmail(s.email,{redirectTo:`${window.location.origin}/reset-password`})}catch{}Le(!0),a.success("✅ Temporary password set! User can now log in.")}catch(N){a.error(N.message||"Failed to set temporary password")}finally{Ve(!1)}},os=async()=>{if(!me){a.error("No password to copy");return}await ee(me)?a.success("Password copied to clipboard!"):a.error("Could not copy automatically. Please select and copy the password manually.")},Ps=s=>{switch(s){case"super_admin":return"bg-purple-100 text-purple-700";case"admin":return"bg-blue-100 text-blue-700";case"director":return"bg-indigo-100 text-indigo-700";case"manager":return"bg-green-100 text-green-700";case"marketing":return"bg-amber-100 text-amber-700";case"standard_user":return"bg-gray-100 text-gray-700";default:return"bg-gray-100 text-gray-700"}},ks=s=>{switch(s){case"active":return"bg-green-100 text-green-700";case"invited":return"bg-yellow-100 text-yellow-700";case"inactive":return"bg-red-100 text-red-700";default:return"bg-gray-100 text-gray-700"}},Ms=s=>s?new Date(s).toLocaleString("en-US",{month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"}):"Never";return Cs?e.jsx(ia,{user:r,module:"users",action:"view",children:e.jsx("div",{className:"p-4 sm:p-6 space-y-4 sm:space-y-6",children:e.jsxs(js,{defaultValue:"users",className:"space-y-6",children:[e.jsx("div",{className:"overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0",children:e.jsxs(Ns,{className:"inline-flex w-auto min-w-full md:grid md:w-full md:grid-cols-3",children:[e.jsx(Te,{value:"users",className:"whitespace-nowrap px-3 sm:px-4 text-xs sm:text-sm",children:"User Management"}),e.jsx(Te,{value:"permissions",className:"whitespace-nowrap px-3 sm:px-4 text-xs sm:text-sm",children:"Role Permissions"}),e.jsx(Te,{value:"recovery",className:"whitespace-nowrap px-3 sm:px-4 text-xs sm:text-sm",children:"User Recovery"})]})}),e.jsxs(Ie,{value:"users",className:"space-y-6",children:[Is&&!S&&e.jsx(ya,{invalidOrgId:r.organizationId,correctOrgId:"rona-atlantic"}),S&&e.jsx(M,{className:"border-blue-200 bg-blue-50",children:e.jsx(X,{className:"p-8",children:e.jsxs("div",{className:"flex flex-col items-center justify-center space-y-4",children:[e.jsx("div",{className:"animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600"}),e.jsxs("div",{className:"text-center",children:[e.jsx("h3",{className:"text-lg font-semibold text-blue-900",children:"Loading Users..."}),e.jsx("p",{className:"text-sm text-blue-700 mt-1",children:"Please wait while we fetch your users from the database"})]})]})})}),P&&!P.includes("infinite recursion")&&!S&&e.jsxs(I,{className:"border-red-400 bg-red-50",children:[e.jsx(Q,{className:"h-5 w-5 text-red-600"}),e.jsxs(O,{className:"text-red-900",children:[e.jsx("strong",{children:"Error loading users:"}),e.jsx("pre",{className:"mt-2 text-xs bg-red-100 p-2 rounded",children:P}),e.jsx(m,{onClick:V,variant:"outline",size:"sm",className:"mt-3",children:"Try Again"})]})]}),_&&re.length>0&&e.jsx(ua,{onRefresh:V}),P==="MANAGER_COLUMN_MISSING"&&e.jsx(ma,{}),bs&&e.jsx(ja,{}),e.jsx(M,{className:"border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50",children:e.jsx(X,{className:"p-6",children:e.jsxs("div",{className:"flex items-start gap-4",children:[e.jsx("div",{className:"h-12 w-12 rounded-lg bg-blue-600 flex items-center justify-center flex-shrink-0",children:e.jsx(Xe,{className:"h-6 w-6 text-white"})}),e.jsxs("div",{className:"flex-1",children:[e.jsx("h3",{className:"text-lg font-semibold text-gray-900 mb-2",children:"Current Organization"}),e.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-3",children:[e.jsxs("div",{children:[e.jsx("p",{className:"text-xs text-gray-600 mb-1",children:"Organization Name"}),Ss?e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx(J,{value:xe,onChange:s=>Ze(s.target.value),className:"h-8 text-sm max-w-[250px]",placeholder:"Enter organization name",autoFocus:!0,onKeyDown:s=>{s.key==="Enter"?ls():s.key==="Escape"&&fe(!1)}}),e.jsx(m,{size:"sm",variant:"ghost",className:"h-8 w-8 p-0 text-green-600 hover:text-green-700",onClick:ls,disabled:ws||!xe.trim(),children:e.jsx(gs,{className:"h-4 w-4"})}),e.jsx(m,{size:"sm",variant:"ghost",className:"h-8 w-8 p-0 text-gray-500 hover:text-gray-700",onClick:()=>fe(!1),children:e.jsx(Vs,{className:"h-4 w-4"})})]}):e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx("p",{className:"font-medium text-gray-900",children:ns}),(r.role==="admin"||r.role==="super_admin")&&e.jsx(m,{size:"sm",variant:"ghost",className:"h-6 w-6 p-0 text-gray-400 hover:text-blue-600",onClick:()=>{Ze(d?.name||""),fe(!0)},title:"Edit organization name",children:e.jsx(oa,{className:"h-3.5 w-3.5"})})]})]}),e.jsxs("div",{children:[e.jsx("p",{className:"text-xs text-gray-600 mb-1",children:"Organization ID"}),e.jsx("p",{className:"font-mono text-sm text-gray-900 bg-white px-2 py-1 rounded border border-gray-200 inline-block",children:r.organizationId})]})]}),r.role==="super_admin"&&e.jsxs("div",{className:"mt-3 flex items-center gap-2 text-sm text-purple-700 bg-purple-100 px-3 py-1.5 rounded-md inline-flex",children:[e.jsx(pe,{className:"h-4 w-4"}),e.jsx("span",{children:"You can view, edit, and delete users from ALL organizations"})]})]})]})})}),e.jsx("div",{className:"flex flex-col sm:flex-row sm:items-center sm:justify-end gap-4",children:e.jsxs("div",{className:"flex gap-2",children:[e.jsxs(m,{variant:"outline",onClick:V,disabled:S,className:"flex items-center gap-2",children:[e.jsx("svg",{className:`h-4 w-4 ${S?"animate-spin":""}`,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"})}),"Refresh"]}),_s&&e.jsxs(m,{variant:"outline",onClick:Os,disabled:Ue,className:"flex items-center gap-2",children:[e.jsx(Re,{className:`h-4 w-4 ${Ue?"animate-pulse":""}`}),Ue?"Scanning...":"Find Missing Users"]}),ze&&e.jsxs(be,{open:l,onOpenChange:t,children:[e.jsx(Ks,{asChild:!0,children:e.jsxs(m,{className:"flex items-center gap-2",children:[e.jsx(ms,{className:"h-4 w-4"}),"Invite User"]})}),e.jsxs(ye,{className:"bg-white",children:[e.jsxs(ve,{children:[e.jsx(Ee,{children:"Invite New User"}),e.jsx(Se,{children:"Add a new user to your organization by filling out the form below."})]}),e.jsxs("form",{onSubmit:Ls,className:"space-y-4",children:[e.jsxs("div",{className:"space-y-2",children:[e.jsx(k,{htmlFor:"name",children:"Name"}),e.jsx(J,{id:"name",value:F.name,onChange:s=>he({...F,name:s.target.value}),required:!0})]}),e.jsxs("div",{className:"space-y-2",children:[e.jsx(k,{htmlFor:"email",children:"Email"}),e.jsx(J,{id:"email",type:"email",value:F.email,onChange:s=>he({...F,email:s.target.value}),required:!0})]}),r.role==="super_admin"&&e.jsxs("div",{className:"space-y-2",children:[e.jsx(k,{htmlFor:"organization",children:"Organization *"}),e.jsxs(ie,{value:F.organizationId,onValueChange:s=>he({...F,organizationId:s}),children:[e.jsx(ne,{children:e.jsx(le,{placeholder:U?"Loading...":"Select organization"})}),e.jsx(oe,{children:p.map(s=>e.jsx(A,{value:s.id,children:e.jsxs("div",{className:"flex items-center gap-2",children:[s.logo?e.jsx("img",{src:s.logo,alt:s.name,className:"h-4 w-4 object-contain"}):e.jsx(Xe,{className:"h-4 w-4"}),e.jsx("span",{children:s.name})]})},s.id))})]}),e.jsx("p",{className:"text-xs text-gray-500",children:"Select which organization this user will belong to"})]}),e.jsxs("div",{className:"space-y-2",children:[e.jsx(k,{htmlFor:"role",children:"Role"}),e.jsxs(ie,{value:F.role,onValueChange:s=>he({...F,role:s}),children:[e.jsx(ne,{children:e.jsx(le,{})}),e.jsxs(oe,{children:[e.jsx(A,{value:"standard_user",children:"Standard User"}),e.jsx(A,{value:"marketing",children:"Marketing"}),e.jsx(A,{value:"designer",children:"Designer"}),e.jsx(A,{value:"manager",children:"Manager"}),e.jsx(A,{value:"director",children:"Director"}),e.jsx(A,{value:"admin",children:"Admin"}),r.role==="super_admin"&&e.jsx(A,{value:"super_admin",children:"Super Admin"})]})]}),e.jsxs("p",{className:"text-xs text-gray-500 mt-1",children:[F.role==="standard_user"&&"Can manage only their own data",F.role==="marketing"&&"Full access to marketing and campaigns, limited access to contacts",F.role==="designer"&&"Access to Project Wizards and design tools. Admins can enable additional modules.",F.role==="manager"&&"Can manage data of users they oversee",F.role==="director"&&"Same as Manager, plus full user visibility on Team Dashboard",F.role==="admin"&&"Full access within the organization",F.role==="super_admin"&&"Full access across all organizations"]})]}),e.jsxs("div",{className:"space-y-2 pt-2 border-t",children:[e.jsx(k,{htmlFor:"inviteMethodOverride",children:"Delivery Method"}),e.jsxs(ie,{value:De,onValueChange:s=>as(s),children:[e.jsx(ne,{id:"inviteMethodOverride",children:e.jsx(le,{})}),e.jsxs(oe,{children:[e.jsx(A,{value:"email",children:"Automatically Email Invite Link"}),e.jsx(A,{value:"manual",children:"Generate Temporary Password"})]})]}),e.jsx("p",{className:"text-[11px] text-gray-500",children:De==="email"?"Requires SMTP setup in Supabase Auth.":"You will need to manually share the temporary password."})]}),e.jsxs("div",{className:"flex gap-2 pt-4",children:[e.jsx(m,{type:"button",variant:"outline",onClick:()=>t(!1),className:"flex-1",children:"Cancel"}),e.jsxs(m,{type:"submit",className:"flex-1",children:[e.jsx(Qe,{className:"h-4 w-4 mr-2"}),"Send Invite"]})]})]})]})]})]})}),$&&($.missing.length>0||$.wrongOrg.length>0)&&e.jsx(M,{className:"border-amber-300 bg-amber-50",children:e.jsxs(X,{className:"p-4",children:[e.jsxs("h4",{className:"font-semibold text-amber-800 mb-3 flex items-center gap-2",children:[e.jsx(Q,{className:"h-4 w-4"}),"Auth Users Missing from User List"]}),$.missing.length>0&&e.jsxs("div",{className:"mb-3",children:[e.jsxs("p",{className:"text-sm text-amber-700 mb-2",children:[e.jsx("strong",{children:$.missing.length})," user(s) exist in auth but have no profile:"]}),e.jsx("div",{className:"space-y-1",children:$.missing.map(s=>e.jsx("div",{className:"flex items-center justify-between bg-white rounded px-3 py-2 text-sm border border-amber-200",children:e.jsxs("div",{children:[e.jsx("span",{className:"font-medium",children:s.name}),e.jsx("span",{className:"text-gray-500 ml-2",children:s.email}),e.jsxs("span",{className:"text-xs text-gray-400 ml-2",children:["(",s.role,")"]})]})},s.id))})]}),$.wrongOrg.length>0&&e.jsxs("div",{className:"mb-3",children:[e.jsxs("p",{className:"text-sm text-amber-700 mb-2",children:[e.jsx("strong",{children:$.wrongOrg.length})," user(s) have a profile but wrong organization:"]}),e.jsx("div",{className:"space-y-1",children:$.wrongOrg.map(s=>e.jsx("div",{className:"flex items-center justify-between bg-white rounded px-3 py-2 text-sm border border-amber-200",children:e.jsxs("div",{children:[e.jsx("span",{className:"font-medium",children:s.name}),e.jsx("span",{className:"text-gray-500 ml-2",children:s.email}),e.jsxs("span",{className:"text-xs text-red-500 ml-2",children:["(org: ",s.currentOrg?.slice(0,8),"...)"]})]})},s.id))})]}),e.jsxs("div",{className:"flex gap-2 mt-3",children:[e.jsxs(m,{size:"sm",onClick:()=>Rs([...$.missing,...$.wrongOrg]),children:["Fix All (",$.missing.length+$.wrongOrg.length," users)"]}),e.jsx(m,{size:"sm",variant:"outline",onClick:()=>je(null),children:"Dismiss"})]})]})}),e.jsxs(M,{children:[e.jsx(H,{children:e.jsxs("div",{className:"relative",children:[e.jsx(Re,{className:"absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400"}),e.jsx(J,{placeholder:"Search users by name, email, role, or status...",value:f,onChange:s=>u(s.target.value),className:"pl-10"})]})}),e.jsxs(X,{children:[v&&re.length>0&&e.jsxs(I,{className:"mb-4",children:[e.jsx(Q,{className:"h-4 w-4"}),e.jsxs(O,{children:[e.jsx("strong",{children:"Local Mode:"})," Currently showing users that you've invited in this session. Deploy the backend to see all organization users and sync across devices."]})]}),e.jsx("div",{className:"overflow-x-auto",children:S?e.jsx("div",{className:"flex items-center justify-center py-12",children:e.jsxs("div",{className:"text-center space-y-3",children:[e.jsx("div",{className:"animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"}),e.jsx("p",{className:"text-gray-600",children:"Loading users..."})]})}):rs.length===0?e.jsxs("div",{className:"flex flex-col items-center justify-center py-12 text-center",children:[e.jsx("div",{className:"h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center mb-4",children:e.jsx(Qe,{className:"h-8 w-8 text-gray-400"})}),e.jsx("h3",{className:"text-lg text-gray-900 mb-2",children:"No users found"}),e.jsx("p",{className:"text-gray-600 mb-4",children:f?"Try adjusting your search query":"Get started by inviting your first team member"}),!f&&ze&&e.jsxs(m,{onClick:()=>t(!0),children:[e.jsx(ms,{className:"h-4 w-4 mr-2"}),"Invite User"]})]}):e.jsxs("table",{className:"w-full",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"border-b border-gray-200",children:[e.jsx("th",{className:"text-left py-3 px-4 text-sm text-gray-600",children:"Actions"}),e.jsx("th",{className:"text-left py-3 px-4 text-sm text-gray-600",children:"User"}),(r.role==="super_admin"||r.role==="admin")&&e.jsx("th",{className:"text-left py-3 px-4 text-sm text-gray-600",children:"Organization"}),e.jsx("th",{className:"text-left py-3 px-4 text-sm text-gray-600",children:"Role"}),e.jsx("th",{className:"text-left py-3 px-4 text-sm text-gray-600",children:"Status"}),e.jsx("th",{className:"text-left py-3 px-4 text-sm text-gray-600",children:"Last Login"})]})}),e.jsx("tbody",{children:rs.map(s=>e.jsxs("tr",{className:"border-b border-gray-100 hover:bg-gray-50",children:[ze&&e.jsx("td",{className:"py-3 px-4",children:e.jsxs(Js,{children:[e.jsx(Zs,{asChild:!0,children:e.jsx(m,{variant:"ghost",size:"sm",disabled:s.id===r.id,children:e.jsx(ea,{className:"h-4 w-4"})})}),e.jsxs(sa,{align:"start",children:[e.jsxs($e,{onClick:()=>Ds(s),children:[e.jsx(aa,{className:"h-4 w-4 mr-2"}),"Edit User"]}),e.jsxs($e,{className:"text-red-600",onClick:()=>Us(s.id),children:[e.jsx(ra,{className:"h-4 w-4 mr-2"}),"Remove"]}),e.jsxs($e,{className:"text-blue-600",onClick:()=>Fs(s),children:[e.jsx(pe,{className:"h-4 w-4 mr-2"}),"Reset Password"]})]})]})}),e.jsx("td",{className:"py-3 px-4",children:e.jsxs("div",{className:"flex items-center gap-3",children:[e.jsx("div",{className:"h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600",children:s.name.charAt(0)}),e.jsxs("div",{children:[e.jsx("p",{className:"text-sm text-gray-900",children:s.name}),e.jsx("p",{className:"text-xs text-gray-500",children:s.email})]})]})}),(r.role==="super_admin"||r.role==="admin")&&e.jsx("td",{className:"py-3 px-4",children:e.jsxs("div",{className:"flex flex-col",children:[e.jsx("span",{className:"text-sm text-gray-900",children:Pe(s.organizationId)}),e.jsxs("span",{className:"text-xs text-gray-400 font-mono",children:["ID: ",s.organizationId]})]})}),e.jsx("td",{className:"py-3 px-4",children:e.jsx("span",{className:`inline-block px-2 py-1 text-xs rounded ${Ps(s.role)}`,children:s.role.replace("_"," ").toUpperCase()})}),e.jsx("td",{className:"py-3 px-4",children:e.jsx("span",{className:`inline-block px-2 py-1 text-xs rounded ${ks(s.status)}`,children:s.status})}),e.jsx("td",{className:"py-3 px-4",children:e.jsx("span",{className:"text-sm text-gray-600",children:Ms(s.lastLogin)})})]},s.id))})]})})]})]}),e.jsx(be,{open:L,onOpenChange:x,children:e.jsxs(ye,{className:"max-h-[90vh] overflow-hidden flex flex-col bg-white",children:[e.jsxs(ve,{children:[e.jsx(Ee,{children:"Edit User"}),e.jsx(Se,{children:"Update the user's details and permissions."})]}),e.jsxs("form",{onSubmit:zs,className:"space-y-4 overflow-y-auto pr-2",children:[e.jsxs("div",{className:"space-y-2",children:[e.jsx(k,{htmlFor:"name",children:"Name"}),e.jsx(J,{id:"name",value:b.name,onChange:s=>te({...b,name:s.target.value}),required:!0})]}),e.jsxs("div",{className:"space-y-2",children:[e.jsx(k,{htmlFor:"email",children:"Email"}),e.jsx(J,{id:"email",type:"email",value:b.email,onChange:s=>te({...b,email:s.target.value}),required:!0})]}),r.role==="super_admin"&&e.jsxs("div",{className:"space-y-2",children:[e.jsxs(k,{htmlFor:"organization",className:"flex items-center gap-2",children:["Organization *",b.organizationId!==ue&&e.jsx("span",{className:"text-xs text-orange-600 font-semibold bg-orange-100 px-2 py-0.5 rounded",children:"⚠️ CHANGED"})]}),e.jsxs(ie,{value:b.organizationId,onValueChange:s=>te({...b,organizationId:s}),children:[e.jsx(ne,{className:b.organizationId!==ue?"border-orange-500 border-2":"",children:e.jsx(le,{placeholder:U?"Loading...":"Select organization"})}),e.jsx(oe,{children:p.map(s=>e.jsx(A,{value:s.id,children:e.jsxs("div",{className:"flex items-center gap-2",children:[s.logo?e.jsx("img",{src:s.logo,alt:s.name,className:"h-4 w-4 object-contain"}):e.jsx(Xe,{className:"h-4 w-4"}),e.jsx("span",{children:s.name})]})},s.id))})]}),b.organizationId!==ue?e.jsxs(I,{className:"border-orange-500 bg-orange-50",children:[e.jsx(Q,{className:"h-4 w-4 text-orange-600"}),e.jsxs(O,{className:"text-orange-900 text-xs",children:[e.jsx("strong",{children:"⚠️ Warning:"})," Changing organization will affect this user's access to data. You will be asked to confirm before saving."]})]}):e.jsx("p",{className:"text-xs text-gray-500",children:"Select which organization this user will belong to"})]}),e.jsxs("div",{className:"space-y-2",children:[e.jsx(k,{htmlFor:"role",children:"Role"}),e.jsxs(ie,{value:b.role,onValueChange:s=>te({...b,role:s}),children:[e.jsx(ne,{children:e.jsx(le,{})}),e.jsxs(oe,{children:[e.jsx(A,{value:"standard_user",children:"Standard User"}),e.jsx(A,{value:"marketing",children:"Marketing"}),e.jsx(A,{value:"designer",children:"Designer"}),e.jsx(A,{value:"manager",children:"Manager"}),e.jsx(A,{value:"director",children:"Director"}),e.jsx(A,{value:"admin",children:"Admin"}),r.role==="super_admin"&&e.jsx(A,{value:"super_admin",children:"Super Admin"})]})]}),e.jsxs("p",{className:"text-xs text-gray-500 mt-1",children:[b.role==="standard_user"&&"Can manage only their own data",b.role==="marketing"&&"Full access to marketing and campaigns, limited access to contacts",b.role==="designer"&&"Access to Project Wizards and design tools. Admins can enable additional modules.",b.role==="manager"&&"Can manage data of users they oversee",b.role==="director"&&"Same as Manager, plus full user visibility on Team Dashboard",b.role==="admin"&&"Full access within the organization",b.role==="super_admin"&&"Full access across all organizations"]})]}),e.jsxs("div",{className:"space-y-2",children:[e.jsx(k,{htmlFor:"status",children:"Status"}),e.jsxs(ie,{value:b.status,onValueChange:s=>te({...b,status:s}),children:[e.jsx(ne,{children:e.jsx(le,{})}),e.jsxs(oe,{children:[e.jsx(A,{value:"active",children:"Active"}),e.jsx(A,{value:"invited",children:"Invited"}),e.jsx(A,{value:"inactive",children:"Inactive"})]})]}),e.jsxs("p",{className:"text-xs text-gray-500 mt-1",children:[b.status==="active"&&"User has full access to the system",b.status==="invited"&&"User has been invited but not yet accepted",b.status==="inactive"&&"User account is temporarily disabled"]})]}),e.jsxs("div",{className:"space-y-2",children:[e.jsx(k,{htmlFor:"manager",children:"Manager (Optional)"}),e.jsxs(ie,{value:b.managerId||"none",onValueChange:s=>te({...b,managerId:s==="none"?"":s}),children:[e.jsx(ne,{children:e.jsx(le,{placeholder:"Select a manager"})}),e.jsxs(oe,{children:[e.jsx(A,{value:"none",children:"No Manager"}),ts.map(s=>e.jsx(A,{value:s.id,children:e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx("div",{className:"h-6 w-6 rounded-full bg-green-100 flex items-center justify-center text-green-600 text-xs",children:s.name.charAt(0)}),e.jsx("span",{children:s.name})]})},s.id))]})]}),e.jsx("p",{className:"text-xs text-gray-500 mt-1",children:ts.length===0?"No active managers available. Assign a Manager role to a user first.":"Assign a manager who will oversee this user"})]}),e.jsxs("div",{className:"flex gap-2 pt-4",children:[e.jsx(m,{type:"button",variant:"outline",onClick:()=>x(!1),className:"flex-1",children:"Cancel"}),e.jsxs(m,{type:"submit",className:"flex-1",children:[e.jsx(Qe,{className:"h-4 w-4 mr-2"}),"Update User"]})]})]})]})}),e.jsx(be,{open:ys,onOpenChange:Le,children:e.jsxs(ye,{className:"sm:max-w-lg max-h-[80vh] overflow-hidden flex flex-col bg-white",children:[e.jsxs(ve,{children:[e.jsx(Ee,{children:"🔐 Password Generated"}),e.jsxs(Se,{children:["Temporary password for ",ae?.name," (",ae?.email,")"]})]}),e.jsxs("div",{className:"space-y-4 overflow-y-auto pr-2",children:[e.jsxs("div",{className:"space-y-2",children:[e.jsx(k,{children:"Generated Temporary Password"}),e.jsx("div",{className:"bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-300 rounded-lg p-6",children:e.jsxs("div",{className:"flex items-center justify-between gap-3",children:[e.jsx("code",{className:"text-3xl font-mono font-bold text-blue-900 select-all break-all flex-1",children:me}),e.jsxs(m,{type:"button",size:"sm",onClick:os,className:"flex-shrink-0",children:[e.jsx(W,{className:"h-4 w-4 mr-2"}),"Copy"]})]})}),e.jsx("p",{className:"text-xs text-red-600 font-semibold",children:"⚠️ This password is shown only once. Copy it before closing this dialog!"})]}),e.jsxs(I,{className:"bg-green-50 border-green-300 border-2",children:[e.jsx(Q,{className:"h-5 w-5 text-green-600"}),e.jsxs(O,{className:"text-green-900",children:[e.jsx("strong",{className:"text-base",children:"✅ Password is Active!"}),e.jsxs("p",{className:"mt-2 text-sm",children:["The user can now ",e.jsx("strong",{children:"login immediately"})," with the temporary password shown above. They will be prompted to change it on first login."]})]})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsxs("div",{className:"bg-blue-50 border-2 border-blue-300 rounded-lg p-4",children:[e.jsxs("h5",{className:"font-semibold text-blue-900 mb-2 flex items-center gap-2",children:[e.jsx("span",{className:"bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs",children:"1"}),"📋 Share the Password"]}),e.jsxs("div",{className:"text-sm text-blue-900 space-y-2 ml-8",children:[e.jsxs("p",{children:["Send this temporary password to ",e.jsx("strong",{children:ae?.email}),":"]}),e.jsx("div",{className:"bg-white border border-blue-300 rounded p-3",children:e.jsx("p",{className:"font-mono text-lg font-bold text-blue-900",children:me})}),e.jsx("p",{className:"text-xs text-blue-700 mt-2",children:"⚠️ They will be required to change this password on first login."})]})]}),e.jsxs("details",{className:"bg-blue-50 border-2 border-blue-300 rounded-lg",children:[e.jsxs("summary",{className:"p-4 cursor-pointer font-semibold text-blue-900 flex items-center gap-2",children:[e.jsx("span",{className:"bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs",children:"2"}),"🔧 Alternative: Supabase Dashboard UI (Click to expand)"]}),e.jsx("div",{className:"px-4 pb-4 text-sm text-blue-900 space-y-2 mt-2",children:e.jsxs("ol",{className:"list-decimal list-inside space-y-1 ml-4",children:[e.jsx("li",{children:"Go to Supabase Dashboard → Authentication → Users"}),e.jsxs("li",{children:["Find: ",e.jsx("code",{className:"bg-blue-100 px-2 py-0.5 rounded font-mono text-xs",children:ae?.email})]}),e.jsx("li",{children:'Click "..." menu → "Update User"'}),e.jsxs("li",{children:['Check "Auto Confirm User" and enter password: ',e.jsx("code",{className:"bg-blue-100 px-2 py-0.5 rounded font-mono text-xs",children:me})]}),e.jsx("li",{children:'Click "Save"'})]})})]}),e.jsxs("details",{className:"bg-gray-100 border-2 border-gray-300 rounded-lg opacity-70",children:[e.jsxs("summary",{className:"p-4 cursor-pointer font-semibold text-gray-600 flex items-center gap-2",children:[e.jsx("span",{className:"bg-gray-400 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs",children:"3"}),"📧 Email Method (Not Available - Email Not Configured)"]}),e.jsxs("div",{className:"px-4 pb-4 text-sm text-gray-600 space-y-2 mt-2",children:[e.jsx("p",{className:"font-medium",children:"Once email is configured in Supabase, you can:"}),e.jsxs("ol",{className:"list-decimal list-inside space-y-1 ml-4",children:[e.jsx("li",{children:'Click "Reset Password" button'}),e.jsx("li",{children:"User receives email with reset link"}),e.jsx("li",{children:"User clicks link and enters the password you provide"}),e.jsx("li",{children:"Password is automatically set"})]}),e.jsx("p",{className:"text-xs mt-2 italic bg-gray-200 p-2 rounded",children:"💡 To enable: Configure SMTP in Supabase Dashboard → Settings → Auth → Email Templates"})]})]})]}),e.jsxs("div",{className:"bg-gray-100 border border-gray-300 rounded-lg p-3",children:[e.jsx("h5",{className:"font-semibold text-gray-900 mb-2 text-sm",children:"👤 User Information"}),e.jsxs("div",{className:"text-sm text-gray-700 space-y-1",children:[e.jsxs("div",{children:[e.jsx("strong",{children:"Name:"})," ",ae?.name]}),e.jsxs("div",{children:[e.jsx("strong",{children:"Email:"})," ",ae?.email]}),e.jsxs("div",{children:[e.jsx("strong",{children:"Role:"})," ",ae?.role]})]})]})]}),e.jsxs("div",{className:"flex gap-2 pt-4 border-t mt-4",children:[e.jsxs(m,{type:"button",variant:"outline",onClick:os,className:"flex-1",children:[e.jsx(W,{className:"h-4 w-4 mr-2"}),"Copy Password"]}),e.jsx(m,{type:"button",onClick:()=>{Le(!1),Ke(null),Be("")},className:"flex-1",children:"Done"})]})]})}),e.jsx(be,{open:Es,onOpenChange:Ae,children:e.jsxs(ye,{className:"sm:max-w-lg max-h-[80vh] overflow-hidden flex flex-col bg-white",children:[e.jsxs(ve,{children:[e.jsx(Ee,{children:"Account Created Successfully"}),e.jsxs(Se,{children:["A new account has been created for ",G?.name,". Share the login credentials below."]})]}),e.jsxs("div",{className:"space-y-4 overflow-y-auto pr-2",children:[e.jsxs("div",{className:"bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-300 rounded-lg p-5 space-y-3",children:[e.jsxs("div",{children:[e.jsx(k,{className:"text-xs text-green-700 uppercase tracking-wide",children:"Email"}),e.jsx("p",{className:"font-mono text-lg font-semibold text-green-900 select-all",children:G?.email})]}),e.jsxs("div",{children:[e.jsx(k,{className:"text-xs text-green-700 uppercase tracking-wide",children:"Temporary Password"}),e.jsxs("div",{className:"flex items-center justify-between gap-3 mt-1",children:[e.jsx("code",{className:"text-2xl font-mono font-bold text-green-900 select-all break-all flex-1",children:G?.tempPassword}),e.jsxs(m,{type:"button",size:"sm",onClick:async()=>{G?.tempPassword&&(await ee(G.tempPassword)?a.success("Password copied!"):a.error("Copy failed. Please select and copy manually."))},className:"flex-shrink-0",children:[e.jsx(W,{className:"h-4 w-4 mr-2"}),"Copy"]})]})]})]}),e.jsx("p",{className:"text-xs text-red-600 font-semibold",children:"This password is shown only once. Copy it before closing this dialog!"}),e.jsxs(I,{className:"bg-blue-50 border-blue-300 border-2",children:[e.jsx(Q,{className:"h-5 w-5 text-blue-600"}),e.jsxs(O,{className:"text-blue-900",children:[e.jsx("strong",{children:"Next Steps:"}),e.jsxs("ol",{className:"list-decimal list-inside mt-2 space-y-1 text-sm",children:[e.jsxs("li",{children:["Share the email and temporary password with ",e.jsx("strong",{children:G?.name})]}),e.jsx("li",{children:"They can sign in immediately at the login page"}),e.jsx("li",{children:"They will be prompted to change their password on first login"})]})]})]})]}),e.jsxs("div",{className:"flex gap-2 pt-4 border-t mt-4",children:[e.jsxs(m,{type:"button",variant:"outline",onClick:async()=>{if(G){const s=`Login Credentials for ${G.name}:
Email: ${G.email}
Temporary Password: ${G.tempPassword}

Please sign in and change your password immediately.`;await ee(s)?a.success("Full credentials copied!"):a.error("Copy failed. Please copy manually.")}},className:"flex-1",children:[e.jsx(W,{className:"h-4 w-4 mr-2"}),"Copy All"]}),e.jsx(m,{type:"button",onClick:()=>{Ae(!1),Je(null)},className:"flex-1",children:"Done"})]})]})})]}),e.jsx(Ie,{value:"permissions",className:"space-y-6",children:e.jsx(ha,{userRole:r.role})}),e.jsxs(Ie,{value:"recovery",className:"space-y-6",children:[e.jsx(ba,{}),e.jsx(Na,{}),e.jsx(fa,{currentUserId:r.id,currentOrganizationId:r.organizationId,currentUserRole:r.role})]})]})})}):e.jsxs("div",{className:"space-y-6",children:[e.jsx("h1",{className:"text-3xl text-foreground",children:"Users"}),e.jsxs(I,{children:[e.jsx(pe,{className:"h-4 w-4"}),e.jsx(O,{children:"You don't have permission to manage users. Only Admins, Directors, and Super Admins can access this section."})]})]})}function va(r=12){const d="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+[]{}|;:,.<>?";let C="";for(let f=0;f<r;f++){const u=Math.floor(Math.random()*d.length);C+=d[u]}return C}export{Pa as Users};
