export default function Footer() {
  return (
    <footer className="py-10">
    <small>
      Created by{" "}
      <a href="#" className="text-emerald-500">
        @your-handle
      </a>{" "}
      &copy; {new Date().getFullYear()}
    </small>
  </footer>
  )
}