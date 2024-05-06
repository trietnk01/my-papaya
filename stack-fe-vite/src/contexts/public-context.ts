import React from "react";
import INews from "@/types/i-news";
interface IPublicContext {
  keyword: string;
  categoryNewsId: string;
  newsData: INews[];
}
const PublicContext = React.createContext<IPublicContext | null>(null);
export default PublicContext;
