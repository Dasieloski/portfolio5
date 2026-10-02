import type { Visuals } from "@/content/types";
import PaymentFlow from "./PaymentFlow";
import Availability from "./Availability";
import StockGrid from "./StockGrid";
import SchemaMap from "./SchemaMap";

/** Picks the interactive illustration for a project. `featured` is the Supernova/ACR payments piece. */
export default function CaseVisual({ slug, vis }: { slug: string; vis: Visuals }) {
  switch (slug) {
    case "featured":
      return <PaymentFlow t={vis.pay} />;
    case "habaluna":
      return <Availability t={vis.avail} />;
    case "gym-victoria":
      return <SchemaMap t={vis.schema} />;
    case "mk-tattoo-supply":
      return <StockGrid t={vis.stock} />;
    default:
      return null;
  }
}
