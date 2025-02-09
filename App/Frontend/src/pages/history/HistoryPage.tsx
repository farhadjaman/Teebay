import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const HistoryPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentTab = location.pathname.split("/").pop() || "bought";

  const handleTabChange = (value: string) => {
    navigate(`/history/${value}`);
  };

  return (
    <div className="container mx-auto p-4">
      <Tabs
        value={currentTab === "history" ? "bought" : currentTab}
        onValueChange={handleTabChange}
        className="w-full mt-5"
      >
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="bought">Bought</TabsTrigger>
          <TabsTrigger value="sold">Sold</TabsTrigger>
          <TabsTrigger value="borrowed">Borrowed</TabsTrigger>
          <TabsTrigger value="lent">Lent</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="mt-11 ">
        <Outlet />
      </div>
    </div>
  );
};

export default HistoryPage;
