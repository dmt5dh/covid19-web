import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

const Header = ({ siteTitle }) => (
  <nav className="w-full flex items-center justify-center flex-wrap bg-indigo-700 p-4 md:p-6 text-xl">
    <div className="mx-8 flex">
      <Link
        to="/"
        className="md:text-base text-sm text-white hover:text-gray-300 mr-10"
      >
        Global
      </Link>
      <Link
        to="/map"
        className="md:text-base text-sm text-white hover:text-gray-300 mr-10"
      >
        Map
      </Link>
      <Link
        to="/about"
        className="md:text-base text-sm text-white hover:text-gray-300"
      >
        About the data
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
