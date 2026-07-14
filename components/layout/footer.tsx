export default function Footer() {
  return (
    <footer className="border-t">
      <div className="mx-auto w-full max-w-7xl px-6 py-8 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} Ecommerce Ordering & Payment System
      </div>
    </footer>
  )
}
