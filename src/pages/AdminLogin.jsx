import { useEffect } from "react";

function AdminLogin() {
  useEffect(() => {
    window.location.href = "/phpligjeratat/pf-bb/dashboardd/login.php";
  }, []);

  return null;
}

export default AdminLogin;
