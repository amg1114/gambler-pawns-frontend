import { useEffect } from "react";
import { usePathname } from "next/navigation";

const useSidebarToggle = (
  isSidebarOpen: boolean,
  setIsSidebarOpen: (open: boolean) => void,
) => {
  const pathname = usePathname();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1400) {
        setIsSidebarOpen(false);
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      const container = document.getElementById("primary-container");
      const sidebar = document.getElementById("default-sidebar");
      if (
        container &&
        container?.contains(event.target as Node) &&
        sidebar &&
        !sidebar.contains(event.target as Node)
      ) {
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    document.addEventListener("click", handleClickOutside);

    // Llamar a handleResize una vez para establecer el estado inicial
    handleResize();

    // Limpiar los event listeners cuando el componente se desmonta
    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("click", handleClickOutside);
    };
  }, [setIsSidebarOpen]);

  // Cerrar el sidebar cuando cambia la ruta
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [pathname]);
};

export default useSidebarToggle;
