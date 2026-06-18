import { useEffect } from "react";

function Admin() {
  useEffect(() => {
    window.location.href = "/phpligjeratat/pf-bb/dashboardd/login.php";
  }, []);

  return null;
}

export default Admin;
