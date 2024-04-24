import { redirect } from "next/navigation"

export default function NotFound() {
    redirect('/')
    /*return (
      <div>
        <p>Page not found with <b>404</b> found</p>
      </div>
    )*/
}