import Link from "next/link";

export default function Signin() {
  return (
    <div>
      {/* <nav>
        <div className="logo">
          <div className="arrow-down"></div>
        </div>
        <ul>
          <li>Services</li>
          <li>Products</li>
          <li>FAQs</li>
          <li>Contact</li>
        </ul>
      </nav> */}
      <section className="banner">
        <div className="container">
          <div className="banner-text">
            <h1>The Hard Work</h1>
            <p>
              <strong>Let's Start building on Next.js 13</strong>
            </p>
            <div className="wrapper">
              <button>
                <Link className="signupBtn" href="/register">
                  Register
                </Link>
              </button>

              <button>
                <Link className="signupBtn" href="/signin">
                  Sign In
                </Link>
              </button>
            </div>
          </div>
        </div>
        <img
          className="banner-image"
          src="https://preview.ibb.co/bMi5Y6/banner_img.png"
          alt="monitoring"
        />
      </section>

      {/* <footer>
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <ul>
                <li>Footer Link</li>
                <li>Footer Link</li>
              </ul>
            </div>
            <div className="col-md-4">
              <ul>
                <li>Footer Link</li>
                <li>Footer Link</li>
              </ul>
            </div>
            <div className="col-md-4">
              <ul>
                <li>Footer Link</li>
                <li>Footer Link</li>
                <li>Footer Link</li>
                <li>Footer Link</li>
                <li>Footer Link</li>
              </ul>
            </div>
          </div>
        </div>
      </footer> */}
    </div>
  );
}
