import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

const Header = ({ siteTitle }) => (
  <nav className="flex items-center justify-between flex-wrap bg-blue-600 p-6 text-xl">
    <div className="mx-8 flex">
      <Link to="/" className="text-white hover:text-gray-300 mr-10">
        Global
      </Link>
      <Link to="united-states" className="text-white hover:text-gray-300">
        United States
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
