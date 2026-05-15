import { useEffect } from "react";
import { Route, Switch } from "wouter";

import Dashboard from "./pages/Dashboard";

// simple placeholder pages so app NEVER breaks
const Page = ({ name }: { name: string }) => (
  <div style={{ padding: 20, color: "white", fontFamily: "sans-serif" }}>
    <h1>{name}</h1>
  </div>
);

// FOOTBALL POSITIONS
const positions = [
  "QB", "RB", "FB",
  "WR", "TE",
  "LT", "LG", "C", "RG", "RT",
  "DE", "DT", "NT",
  "OLB", "MLB", "ILB",
  "CB", "FS", "SS",
  "K", "P"
];

// DAILY FOOD RESET SYSTEM
function useDailyFoodReset() {
  useEffect(() => {
    const today = new Date().toDateString();
    const savedDay = localStorage.getItem("food_day");

    if (savedDay !== today) {
      localStorage.setItem("food_day", today);
      localStorage.setItem("food_items", JSON.stringify([]));
      localStorage.setItem("food_calories", "0");
      console.log("Food reset for new day");
    }
  }, []);
}

export default function App() {
  useDailyFoodReset();

  return (
    <div style={{ minHeight: "100vh", background: "#0f0f0f" }}>
      <Switch>
        <Route path="/" component={Dashboard} />
        <Route path="/workouts" component={() => <Page name="Workouts" />} />
        <Route path="/nutrition" component={() => <Page name="Nutrition" />} />
        <Route path="/progress" component={() => <Page name="Progress" />} />
        <Route path="/coach" component={() => <Page name="Coach AI" />} />
        <Route path="/recruiting" component={() => <Page name="Recruiting" />} />
        <Route path="/recovery" component={() => <Page name="Recovery" />} />
        <Route path="/film" component={() => <Page name="Film Study" />} />
        <Route path="/more" component={() => <Page name="More Tools" />} />

        <Route>
          <Page name="404 Not Found" />
        </Route>
      </Switch>

      {/* hidden data for your app use */}
      <script
        dangerouslySetInnerHTML={{
          __html: `window.positions = ${JSON.stringify(positions)}`
        }}
      />
    </div>
  );
}
