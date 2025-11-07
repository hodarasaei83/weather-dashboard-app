import { useState } from "react";
import Navbar from "../../shared/Navbar";
import Footer from "../../shared/Footer";
import DashboardContent from "./DashboardContent";

export default function Dashboard() {
    const [mode, setMode] = useState<"light" | "dark">("light");
    return (
    <>
        <Navbar mode={mode} setMode={setMode} />
        <DashboardContent mode={mode} setMode={setMode} />
        <Footer />
    </>
    );
}