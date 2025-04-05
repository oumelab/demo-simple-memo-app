export default function Footer() {
  return (
    <footer className="py-10 text-center">
    <small>
      Created by{" "}
      <a href="#" className="text-emerald-700">
        @your-handle
      </a>{" "}
      &copy; {new Date().getFullYear()}
    </small>
  </footer>
  )
}