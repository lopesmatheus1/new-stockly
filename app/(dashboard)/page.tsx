import {
  CircleDollarSign,
  DollarSign,
  PackageIcon,
  ShoppingBasketIcon,
} from "lucide-react";
import {
  SummaryCard,
  SummaryCardIcon,
  SummaryCardTitle,
  SummaryCardValue,
} from "./_components/summary-card";
import { getDashboard } from "../_data-access/dashboard/get-dashboard";
import { format } from "path";
import { FormatCurrency } from "../_helpers/currency";
import RevenueChart from "./_components/revenue-chart";

export default async function Home() {
  const {
    todayRevenue,
    totalProducts,
    totalRevenue,
    totalSales,
    totalStock,
    totalLast14DaysRevenue,
  } = await getDashboard();
  return (
    <div className="mx-8 my-8 flex w-full flex-col space-y-2 rounded-lg bg-white">
      <div className="flex w-full justify-between px-2 py-8">
        <div className="flex flex-col">
          <span className="text-primary">Dashboard</span>
          <h2 className="text-2xl font-semibold text-foreground">Dashboard</h2>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <SummaryCard>
          <SummaryCardIcon>
            <DollarSign />
          </SummaryCardIcon>
          <SummaryCardTitle>Receita Total</SummaryCardTitle>
          <SummaryCardValue>R${totalRevenue}</SummaryCardValue>
        </SummaryCard>

        <SummaryCard>
          <SummaryCardIcon>
            <DollarSign />
          </SummaryCardIcon>
          <SummaryCardTitle>Receita Hoje</SummaryCardTitle>
          <SummaryCardValue>R${todayRevenue}</SummaryCardValue>
        </SummaryCard>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <SummaryCard>
          <SummaryCardIcon>
            <CircleDollarSign />
          </SummaryCardIcon>
          <SummaryCardTitle>Vendas totais</SummaryCardTitle>
          <SummaryCardValue>{totalSales}</SummaryCardValue>
        </SummaryCard>

        <SummaryCard>
          <SummaryCardIcon>
            <PackageIcon />
          </SummaryCardIcon>
          <SummaryCardTitle>Total em estoque</SummaryCardTitle>
          <SummaryCardValue>{totalStock}</SummaryCardValue>
        </SummaryCard>

        <SummaryCard>
          <SummaryCardIcon>
            <ShoppingBasketIcon />
          </SummaryCardIcon>
          <SummaryCardTitle>Produtos</SummaryCardTitle>
          <SummaryCardValue>{totalProducts}</SummaryCardValue>
        </SummaryCard>
      </div>

      <div className="flex h-full flex-col overflow-hidden rounded-xl bg-white p-6">
        <p className="text-2xl font-semibold text-slate-900">Receita</p>
        <p>Últimos 14 dias</p>

        <RevenueChart data={totalLast14DaysRevenue} />
      </div>
    </div>
  );
}
