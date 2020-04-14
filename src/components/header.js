import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"


const Header = ({ siteTitle }) => (
  <nav className="w-full bg-indigo-700 p-4 md:p-6 text-xl sticky top-0 z-50">
    <div className="xl::px-24 sm:mx-16 xl:mx-64 flex justify-around">
      <Link
        to="/"
        className="md:text-base text-sm text-white hover:text-indigo-300 mr-10"
      >
        Summary
      </Link>
      <Link
        to="/map"
        className="md:text-base text-sm text-white hover:text-indigo-300 mr-10"
      >
        Map
      </Link>
      <Link
        to="/about"
        className="md:text-base text-sm text-white hover:text-indigo-300"
      >
        About
      </Link>
    </div>
  </nav>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
