import type { Visuals } from "@/content/types";
import GatewayFlow from "./GatewayFlow";
import TopUp from "./TopUp";
import IssueCard from "./IssueCard";
import CardApp from "./CardApp";
import StockGrid from "./StockGrid";
import SchemaMap from "./SchemaMap";

/** Each project gets the animation that explains its own problem. */
export default function CaseVisual({ slug, vis }: { slug: string; vis: Visuals }) {
  switch (slug) {
    case "acr-card":
      return <IssueCard t={vis.issue} />;
    case "acr-card-app":
      return <CardApp t={vis.app} />;
    case "supernova-gateway":
      return <GatewayFlow t={vis.gateway} />;
    case "acr-pay":
      return <TopUp t={vis.topup} />;
    case "gym-victoria":
      return <SchemaMap t={vis.schema} />;
    case "mk-tattoo-supply":
      return <StockGrid t={vis.stock} />;
    default:
      return null;
  }
}
