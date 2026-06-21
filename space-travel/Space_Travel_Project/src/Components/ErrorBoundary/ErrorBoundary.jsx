import { Component } from "react";
import PropTypes from "prop-types";
import styles from "./ErrorBoundary.module.css";

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error, info) {
    console.error("ErrorBoundary caught:", error, info);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className={styles.error}>
          <h1 className={styles.error__title}>🛰️ Houston, we have a problem</h1>
          <p className={styles.error__text}>
            Something went wrong on the bridge. Try reloading the page.
          </p>
          <button
            className={styles.error__button}
            onClick={() => window.location.reload()}
          >
            Reload
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
ErrorBoundary.propTypes = {
  children: PropTypes.node,
};
