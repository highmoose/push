import Header from "@/components/layout/header";
import React, { useEffect, useState } from "react";
import Clients from "@role/trainer/tabs/clients";
import Dashboard from "@role/trainer/tabs/dashboard";
import Messages from "@role/trainer/tabs/messages";
import Planner from "@role/trainer/tabs/planner";
import Settings from "@role/trainer/tabs/settings";
import Metrics from "@role/trainer/tabs/metrics";
import Blueprints from "@role/trainer/tabs/blueprints";
import Footer from "@/components/layout/footer";

import { fetchClients } from "@/redux/slices/clientSlice";
import { fetchSessions } from "@/redux/slices/sessionSlice";

import { useDispatch, useSelector } from "react-redux";

import {
  fetchConversations,
  sendMessage,
  addMessage,
  fetchAllMessages,
} from "@/redux/slices/messagingSlice";

export default function trainerDashboard() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [showTab, setShowTab] = useState("dashboard");

  const authUser = useSelector((state) => state.auth.user);
  const authUserId = authUser?.user?.id;

  useEffect(() => {
    if (user?.role === "trainer") {
      // Once all pages are in, pull all this data in one go instead of seperate calls
      dispatch(fetchClients());
      dispatch(fetchSessions());
      dispatch({ type: "messaging/setAuthUserId", payload: authUserId });
      dispatch(fetchConversations()); // ✅ fine
      dispatch(fetchAllMessages({ authUserId })); // ✅ pass id explicitly
    }
  }, [dispatch, user]);

  return (
    <div className="flex flex-col w-full min-h-screen ">
      <Header showTab={showTab} setShowTab={setShowTab} />
      <div className="flex-1 w-full px-8 pb-8">
        {/* Menu Tabs  */}
        {showTab === "dashboard" && <Dashboard />}
        {showTab === "messages" && <Messages authUserId={authUserId} />}
        {showTab === "planner" && <Planner />}
        {showTab === "clients" && <Clients />}
        {showTab === "metrics" && <Metrics />}
        {showTab === "blueprints" && <Blueprints />}
        {/* Control Tabs */}
        {showTab === "settings" && <Settings />}
        {/* {showTab === "profile" && <Profile />} */}
      </div>
      <Footer />
    </div>
  );
}
