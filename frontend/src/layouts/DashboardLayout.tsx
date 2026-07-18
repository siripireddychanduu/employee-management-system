import React from "react";
import Sidebar from "../components/Sidebar"; // Adjust path as needed
import Navbar from "../components/Navbar"; // Adjust path as needed

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    // 1. Core Wrapper: Locks viewport height and prevents default browser body bouncing
    <div className="flex h-screen w-screen overflow-hidden bg-gray-50/50">
      {/* 2. Sidebar: Inherits parent h-screen height and stays fixed horizontally */}
      <Sidebar />

      {/* 3. Primary Content Pane: Fills remaining space, flexes vertically */}
      <div className="flex flex-1 flex-col min-w-0">
        {/* Navbar stays pinned to the top of the content pane */}
        <Navbar />

        {/* 4. Scrolling Dashboard Box: Replaces global window scrolling */}
        <main className="flex-1 overflow-y-auto px-8 py-8 custom-scrollbar">
          <div className="max-w-7xl mx-auto w-full">{children}</div>
        </main>
      </div>
    </div>
  );
}
