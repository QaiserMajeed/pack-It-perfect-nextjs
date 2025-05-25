'use client';
import React, { useState, useEffect } from "react";
import Link from "next/link";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { useCountryContent } from "../hooks/useCountryContent";
import Products from "./Products";
import TelephoneContact from "./Telephone";
import LocaleSelector from "./LocaleSelector";

// Atoms-inspired Styled Components
const StyledHeader = styled.header`
  font-family: "Inter", -apple-system, BlinkMacSystemFont, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
`;

const AnnouncementBar = styled.div`
  background-color: #000;
  color: #fff;
  font-size: 1rem;
  font-weight: 200;
  letter-spacing: 0.02em;
  text-align: center;
`;

const MainHeader = styled.div`
  padding: 20px 0 0 0;
  background-color: #fff;
  border-bottom: 1px solid rgba(0, 0, 0, 0.04);
`;

const MenuToggle = styled.button`
  background: none;
  border: none;
  padding: 0;
  width: 24px;
  height: 24px;
  position: relative;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  span,
  span:before,
  span:after {
    width: 24px;
    height: 1.5px;
    background-color: #000;
    position: absolute;
    transition: all 0.3s ease;
  }

  span:before,
  span:after {
    content: "";
    display: block;
  }

  span:before {
    top: -6px;
  }

  span:after {
    bottom: -6px;
  }

  @media (min-width: 992px) {
    display: none;
  }
`;

const HeaderLogo = styled.a`
  margin-left: 1rem;

  @media (min-width: 992px) {
    margin-left: 1rem;
  }

  img {
    height: 2rem;
    width: 8rem;
  }
`;

const NavContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  .test {
    @media (max-width: 560px) {
      width: 55%;
    }
  }
`;

const DesktopNav = styled.nav`
  display: none;
  position: relative;
  z-index: 1000;

  @media (min-width: 992px) {
    display: block;
  }

  .nav-menu {
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
    gap: 30px;
    margin-right: 1rem;
  }

  .nav-item {
    position: relative;
  }

  .nav-link {
    display: block;
    color: #000;
    font-weight: 350;
    font-size: 13px;
    text-decoration: none;
    transition: opacity 0.2s;
    padding: 15px 0;

    &:hover {
      opacity: 0.7;
    }
  }

  .dropdown {
    position: relative;
  }

  .dropdown-menu {
    display: none;
    position: absolute;
    left: 0;
    width: 80vw;
    background-color: white;
    z-index: 1000;
    top: 100%;
    left: 50%;
    transform: translateX(-30%);
    padding: 20px 0;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }

  .dropdown:hover .dropdown-menu {
    display: block;
  }

  .category-item {
    display: flex;
    align-items: center;
    color: #333;
    text-decoration: none;
    padding: 12px 16px;
    border-radius: 6px;
    transition: all 0.2s ease;

    &:hover {
      background-color: #f8f8f8;
      color: #000;
    }
  }

  .category-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    background-color: #f5f5f5;
    border-radius: 50%;
    margin-right: 12px;

    i {
      color: #000;
      font-size: 16px;
    }
  }
  .category-icon i {
    color: #000;
    font-size: 18px;
  }

  /* Category name */
  .category-name {
    font-weight: 300;
    text-align: left;
  }

  .help-section {
    padding: 0 15px;

    h4 {
      color: #000;
      margin-bottom: 15px;
      font-weight: 600;
      font-size: 16px;
    }

    p {
      font-size: 14px;
      margin-bottom: 20px;
      line-height: 1.6;
      color: #555;
    }

    .cta-button {
      display: inline-block;
      background-color: #000;
      color: white;
      padding: 12px 24px;
      border-radius: 30px;
      text-decoration: none;
      font-weight: 500;
      font-size: 14px;
      letter-spacing: 0.02em;
      transition: opacity 0.2s;

      &:hover {
        opacity: 0.8;
        color: white;
      }
    }
  }
`;

const MobileMenuWrapper = styled.div`
  position: fixed;
  top: 0;
  left: ${(props) => (props.active ? "0" : "-100%")};
  width: 100%;
  height: 100%;
  z-index: 1100;
  transition: left 0.3s ease;
`;

const MobileBackdrop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
`;

const MobileMenu = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 85%;
  max-width: 360px;
  height: 100%;
  background: #fff;
  padding: 0;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
`;

const MobileMenuHeader = styled.div`
  padding: 20px;
  display: flex;
  justify-content: flex-end;
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
`;

const MobileCloseButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  color: #000;
  cursor: pointer;
`;

const MobileMenuContent = styled.div`
  flex-grow: 1;
  padding: 20px 0;
`;

const MobileNav = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const MobileNavItem = styled.li`
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
`;

const MobileNavLink = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  color: #000;
  font-size: 16px;
  font-weight: 500;
  text-decoration: none;
  transition: background-color 0.2s ease;
  cursor: ${(props) => (props.onClick ? "pointer" : "default")};

  &:hover {
    background-color: rgba(0, 0, 0, 0.02);
  }
`;

const MobileSubmenu = styled.div`
  display: ${(props) => (props.active ? "block" : "none")};
  background: #f9f9f9;
`;

const MobileSubmenuContent = styled.div`
  padding: 8px 0;
`;

const MobileSubmenuLink = styled.a`
  display: flex;
  align-items: center;
  padding: 12px 20px 12px 40px;
  color: #444;
  font-size: 14px;
  text-decoration: none;
  transition: background-color 0.2s ease;

  i {
    margin-right: 12px;
  }

  &:hover {
    background-color: rgba(0, 0, 0, 0.04);
  }
`;

const MobileMenuFooter = styled.div`
  padding: 20px;
  border-top: 1px solid rgba(0, 0, 0, 0.06);
`;

const PrimaryButton = styled.a`
  display: block;
  width: 100%;
  background-color: #000;
  color: #fff;
  font-size: 14px;
  font-weight: 500;
  text-align: center;
  padding: 16px 20px;
  border-radius: 30px;
  text-decoration: none;
  transition: opacity 0.2s ease;

  &:hover {
    background-color: #000;
    opacity: 0.8;
    color: #fff;
  }
`;

const MobileContact = styled.div`
  text-align: center;
  font-size: 10px;
  margin-top: 20px;
`;

const MobilePhone = styled.a`
  font-size: 10px;
  font-weight: 600;
  color: #000;
  text-decoration: none;
`;

const LocaleSelectorWrapper = styled.div`
  margin-left: 16px;

  @media (max-width: 992px) {
    display: none; // Hide in mobile menu, show in footer instead
  }
`;

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [searchActive, setSearchActive] = useState(false);
  const { t } = useTranslation();
  const { getPhoneNumber } = useCountryContent();

  // Close menu when resizing to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 992) {
        setMobileMenuOpen(false);
        setExpandedCategory(null);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    // Prevent body scrolling when menu is open
    document.body.style.overflow = !mobileMenuOpen ? "hidden" : "";
  };

  // Toggle category expansion
  const toggleCategory = (category) => {
    setExpandedCategory(expandedCategory === category ? null : category);
  };

  // Toggle search bar
  const toggleSearch = () => {
    setSearchActive(!searchActive);
  };

  return (
    <StyledHeader>
      {/* Announcement bar */}
      <AnnouncementBar>
        <div className="container">{t("header.announcement")}</div>
      </AnnouncementBar>

      {/* Main header */}
      <MainHeader>
        <div className="container">
          <NavContainer>
            {/* Logo (on left) */}
            <div
              className="d-flex align-items-center test"
              style={{ justifyContent: "flex-start" }}
            >
              <MenuToggle
                className={mobileMenuOpen ? "active" : ""}
                onClick={toggleMobileMenu}
                aria-label="Menu"
              >
                <span className="menu-icon"></span>
              </MenuToggle>
              <HeaderLogo to="/">
                <Image src="/images/logo.png" alt="Pack it Perfect" />
              </HeaderLogo>
            </div>

            {/* Desktop Navigation (on right) */}
            <div className="d-flex align-items-center">
              <DesktopNav>
                <ul className="nav-menu">
                  <li className="nav-item">
                    <Link to="/" className="nav-link">
                      Home
                    </Link>
                  </li>
                  <li className="nav-item dropdown">
                    <a href="#" className="nav-link dropdown-toggle">
                      By Industry
                    </a>
                    <div className="dropdown-menu">
                      <div className="container">
                        <div className="row">
                          {/* Main categories area - takes 9 columns */}
                          <div className="col-md-9">
                            {/* Categories grid */}
                            <div className="row">
                              {Products.map((category, index) => (
                                <div key={index} className="col-md-4">
                                  {category.category !==
                                    "packaging-by-style" && (
                                    <Link
                                      to={`/category/${category.category}`}
                                      className="category-item"
                                    >
                                      <span className="category-icon">
                                        <i
                                          className={
                                            category.icon || "fas fa-box"
                                          }
                                        ></i>
                                      </span>
                                      <span className="category-name">
                                        {category.name}
                                      </span>
                                    </Link>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Help section - takes 3 columns */}
                          <div className="col-md-3">
                            <div className="help-section">
                              <h4>Need Help?</h4>
                              <p>
                                Contact our packaging specialists for custom
                                solutions tailored to your needs.
                              </p>
                              <a href="/get-a-quote" className="cta-button">
                                Get a Quote
                              </a>
                              <p className="mt-3 mb-0">
                                <strong>Call us:</strong>
                              </p>
                              <p className="fw-bold">+44 0744018948</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li className="nav-item">
                    <a href="/category/packaging-by-style" className="nav-link">
                      By Material
                    </a>
                  </li>
                  <li className="nav-item">
                    <Link to="/jars-cups" className="nav-link">
                      Jars & Cups
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/blog" className="nav-link">
                      Blog
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to={`/payment-plans`} className="nav-link">
                      Payment
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to={`/get-a-quote`} className="nav-link">
                      Quote
                    </Link>
                  </li>
                </ul>
              </DesktopNav>
              <LocaleSelectorWrapper>
                <LocaleSelector />
              </LocaleSelectorWrapper>
            </div>
            <TelephoneContact />
          </NavContainer>
        </div>
      </MainHeader>

      {/* Mobile Navigation */}
      <MobileMenuWrapper active={mobileMenuOpen}>
        {/* Backdrop */}
        <MobileBackdrop onClick={toggleMobileMenu}></MobileBackdrop>

        {/* Mobile menu */}
        <MobileMenu>
          <MobileMenuHeader>
            <MobileCloseButton
              onClick={toggleMobileMenu}
              aria-label="Close menu"
            >
              <i className="fas fa-times"></i>
            </MobileCloseButton>
          </MobileMenuHeader>

          <MobileMenuContent>
            <MobileNav>
              <MobileNavItem>
                <Link
                  to="/"
                  style={{
                    display: "block",
                    textDecoration: "none",
                  }}
                  onClick={toggleMobileMenu}
                >
                  <MobileNavLink as="div">
                    <span>Home</span>
                  </MobileNavLink>
                </Link>
              </MobileNavItem>

              {/* Industry dropdown */}
              <MobileNavItem>
                <MobileNavLink onClick={() => toggleCategory("industry")}>
                  <span>By Industry</span>
                  <i
                    className={`fas ${
                      expandedCategory === "industry"
                        ? "fa-chevron-up"
                        : "fa-chevron-down"
                    }`}
                  ></i>
                </MobileNavLink>

                <MobileSubmenu active={expandedCategory === "industry"}>
                  <MobileSubmenuContent>
                    {Products.map(
                      (category, index) =>
                        category.category !== "packaging-by-style" && (
                          <MobileSubmenuLink
                            key={index}
                            to={`/category/${category.category}`}
                            onClick={toggleMobileMenu}
                          >
                            <i className={category.icon || "fas fa-box"}></i>
                            <span>{category.name}</span>
                          </MobileSubmenuLink>
                        )
                    )}
                  </MobileSubmenuContent>
                </MobileSubmenu>
              </MobileNavItem>

              {/* By Material */}
              <MobileNavItem>
                <Link
                  to="/category/packaging-by-style"
                  style={{
                    display: "block",
                    textDecoration: "none",
                  }}
                  onClick={toggleMobileMenu}
                >
                  <MobileNavLink as="div">
                    <span>By Material</span>
                  </MobileNavLink>
                </Link>
              </MobileNavItem>

              {/* Jars & Cups */}
              <MobileNavItem>
                <a
                  href="/jars-cups"
                  style={{
                    display: "block",
                    textDecoration: "none",
                  }}
                  onClick={toggleMobileMenu}
                >
                  <MobileNavLink as="div">
                    <span>Jars & Cups</span>
                  </MobileNavLink>
                </a>
              </MobileNavItem>

              {/* Blog */}
              <MobileNavItem>
                <a
                  href="/blog"
                  style={{
                    display: "block",
                    textDecoration: "none",
                  }}
                  onClick={toggleMobileMenu}
                >
                  <MobileNavLink as="div">
                    <span>Blog</span>
                  </MobileNavLink>
                </a>
              </MobileNavItem>

              {/* Payment Plan */}
              <MobileNavItem>
                <a
                  href="/payment-plans"
                  style={{
                    display: "block",
                    textDecoration: "none",
                  }}
                  onClick={toggleMobileMenu}
                >
                  <MobileNavLink as="div">
                    <span>Payment Plan</span>
                  </MobileNavLink>
                </a>
              </MobileNavItem>

              {/* Quote */}
              <MobileNavItem>
                <Link
                  to="/get-a-quote"
                  style={{
                    display: "block",
                    textDecoration: "none",
                  }}
                  onClick={toggleMobileMenu}
                >
                  <MobileNavLink as="div">
                    <span>Quote</span>
                  </MobileNavLink>
                </Link>
              </MobileNavItem>
            </MobileNav>
          </MobileMenuContent>

          <MobileMenuFooter>
            <PrimaryButton to="/get-a-quote" onClick={toggleMobileMenu}>
              {t("hero.cta")}
            </PrimaryButton>
            <MobileContact>
              <p className="mb-1">
                <strong>Call us:</strong>
              </p>
              <MobilePhone>
                <a href={`tel:${getPhoneNumber()}`}>{getPhoneNumber()}</a>
              </MobilePhone>
            </MobileContact>
            {/* Add locale selector to mobile menu */}
            <div
              style={{
                marginTop: "20px",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <LocaleSelector />
            </div>
          </MobileMenuFooter>
        </MobileMenu>
      </MobileMenuWrapper>
    </StyledHeader>
  );
};

export default Header;

