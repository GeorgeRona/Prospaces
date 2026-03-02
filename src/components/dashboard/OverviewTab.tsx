import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { ExplicitChartContainer } from "../ui/ExplicitChartContainer";
import { 
  DollarSign, 
  TrendingUp, 
  Target, 
  Clock, 
  BarChart3, 
  Briefcase, 
  Layers, 
  Calendar 
} from 'lucide-react';
import { MetricCard } from '../MetricCard';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  PieChart, 
  Pie, 
  Cell, 
  Legend 
} from 'recharts';

interface OverviewTabProps {
  metrics: {
    totalSales: number;
    winRate: number;
    closeRate: number;
    avgDaysToClose: number;
    pipelineValue: number;
    openDeals: number;
    weightedValue: number;
    avgOpenDealAge: number;
  };
  charts: {
    pipeline: any[];
    wonDeals: any[];
    lossReasons: any[];
    projection: any[];
  };
}

export function OverviewTab({ metrics, charts }: OverviewTabProps) {
  // Colors for charts
  const PIPELINE_COLORS = ['#0ea5e9', '#6366f1', '#8b5cf6', '#ec4899', '#14b8a6'];
  const LOSS_COLORS = ['#6366f1', '#8b5cf6', '#ec4899', '#f43f5e', '#10b981'];

  return (
    <div className="space-y-6">
      {/* Top Metrics Row 1 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard 
          title="Total Sales" 
          value={`$${(metrics.totalSales / 1000).toFixed(2)}k`} 
          icon={<DollarSign className="h-4 w-4" />}
          className="bg-indigo-600 text-white min-w-0" 
          description="Total revenue from won deals"
        />
        <MetricCard 
          title="Win Rate" 
          value={`${metrics.winRate.toFixed(1)}%`} 
          icon={<TrendingUp className="h-4 w-4" />}
          className="bg-blue-900 text-white min-w-0" 
          description="Percentage of closed deals won"
        />
        <MetricCard 
          title="Close Rate" 
          value={`${metrics.closeRate.toFixed(1)}%`} 
          icon={<Target className="h-4 w-4" />}
          className="bg-sky-600 text-white min-w-0" 
          description="Estimated conversion rate"
        />
        <MetricCard 
          title="Avg Days to Close" 
          value={metrics.avgDaysToClose.toFixed(1)} 
          icon={<Clock className="h-4 w-4" />}
          className="bg-teal-500 text-white min-w-0" 
          description="Average deal duration"
        />
      </div>

      {/* Top Metrics Row 2 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard 
          title="Pipeline Value" 
          value={`$${(metrics.pipelineValue / 1000).toFixed(2)}k`} 
          icon={<BarChart3 className="h-4 w-4" />}
          className="bg-indigo-500 text-white min-w-0" 
          description="Total value of open deals"
        />
        <MetricCard 
          title="Open Deals" 
          value={metrics.openDeals.toString()} 
          icon={<Briefcase className="h-4 w-4" />}
          className="bg-blue-800 text-white min-w-0" 
          description="Active opportunities"
        />
        <MetricCard 
          title="Weighted Value" 
          value={`$${(metrics.weightedValue / 1000).toFixed(2)}k`} 
          icon={<Layers className="h-4 w-4" />}
          className="bg-sky-500 text-white min-w-0" 
          description="Probability-adjusted value"
        />
        <MetricCard 
          title="Avg Deal Age" 
          value={metrics.avgOpenDealAge.toFixed(1)} 
          icon={<Calendar className="h-4 w-4" />}
          className="bg-emerald-500 text-white min-w-0" 
          description="Days since creation"
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Won Deals Trend (Line Chart) - Spans 2 cols */}
        <Card className="lg:col-span-2 shadow-sm border-0 min-w-0">
          <CardHeader>
            <CardTitle className="text-gray-700">Won deals (last 12 months)</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Using absolute positioning trick to fix Recharts width issue */}
            <div className="relative h-[300px] w-full min-w-0">
              <div className="absolute inset-0">
                <ExplicitChartContainer>
                  <LineChart data={charts.wonDeals} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#6b7280'}} />
                    <YAxis yAxisId="left" axisLine={false} tickLine={false} tick={{fill: '#6b7280'}} width={40} />
                    <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} tick={{fill: '#6b7280'}} width={40} />
                    <Tooltip />
                    <Legend />
                    <Line yAxisId="left" type="monotone" dataKey="value" stroke="#0ea5e9" strokeWidth={3} dot={{r: 4}} name="Closed Value ($)" />
                    <Line yAxisId="right" type="monotone" dataKey="deals" stroke="#38bdf8" strokeWidth={3} dot={{r: 4}} name="Won Deals (Qty)" />
                  </LineChart>
                </ExplicitChartContainer>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Sales Pipeline (Donut) - Spans 1 col */}
        <Card className="lg:col-span-1 shadow-sm border-0 min-w-0">
          <CardHeader>
            <CardTitle className="text-gray-700">Sales pipeline</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative h-[300px] w-full min-w-0">
              <div className="absolute inset-0">
                <ExplicitChartContainer>
                  <PieChart margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                    <Pie
                      data={charts.pipeline}
                      cx="50%"
                      cy="40%"
                      innerRadius="50%"
                      outerRadius="70%"
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {charts.pipeline.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={PIPELINE_COLORS[index % PIPELINE_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend verticalAlign="bottom" height={72} iconType="circle" wrapperStyle={{ bottom: 0 }} />
                  </PieChart>
                </ExplicitChartContainer>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Deals Projection (Line Chart) - Spans 2 cols */}
        <Card className="lg:col-span-2 shadow-sm border-0 min-w-0">
          <CardHeader>
            <CardTitle className="text-gray-700">Deals projection (future 12 months)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative h-[300px] w-full min-w-0">
              <div className="absolute inset-0">
                <ExplicitChartContainer>
                  <LineChart data={charts.projection} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#6b7280'}} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#6b7280'}} width={40} />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="projected" stroke="#0ea5e9" strokeWidth={3} dot={false} name="Projected Value" />
                    <Line type="monotone" dataKey="actual" stroke="#38bdf8" strokeWidth={3} dot={false} name="Actual / Target" />
                  </LineChart>
                </ExplicitChartContainer>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Deal Loss Reasons (Donut) - Spans 1 col */}
        <Card className="lg:col-span-1 shadow-sm border-0 min-w-0">
          <CardHeader>
            <CardTitle className="text-gray-700">Deal loss reasons</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative h-[300px] w-full min-w-0">
              <div className="absolute inset-0">
                <ExplicitChartContainer>
                  <PieChart margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                    <Pie
                      data={charts.lossReasons}
                      cx="50%"
                      cy="40%"
                      innerRadius="50%"
                      outerRadius="70%"
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {charts.lossReasons.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={LOSS_COLORS[index % LOSS_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend verticalAlign="bottom" height={72} iconType="circle" wrapperStyle={{ bottom: 0 }} />
                  </PieChart>
                </ExplicitChartContainer>
              </div>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
