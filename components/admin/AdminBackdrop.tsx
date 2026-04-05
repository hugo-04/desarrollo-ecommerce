"use client"

export function AdminBackdrop() {
  const close = () => {
    const sidebar = document.getElementById("admin-sidebar")
    if (sidebar) {
      sidebar.classList.remove("open")
      sidebar.style.transform = ""
    }
    document.getElementById("admin-backdrop")?.classList.add("hidden")
  }

  return (
    <div
      id="admin-backdrop"
      onClick={close}
      className="fixed inset-0 z-20 bg-black/60 hidden transition-opacity duration-300 md:hidden"
    />
  )
}
