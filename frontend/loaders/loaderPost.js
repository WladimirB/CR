function loader(url, state, headers = {}) {
  this.state = state;
  fetch(url, {
    method: 'POST',
    headers: { ...headers, 'Content-Type': 'application/json' },
    body: JSON.stringify(this.state),
  })
    .then((response) => {
      this.setState({ status: response.status });
      return response.text();
    })
    .then((result) => {
      this.setState({ message: result });
      if (this.state.status >= 400) {
        this.setState({ alert: 'danger' });
      } else {
        this.setState({ alert: 'success' });
        setTimeout(() => {
          window.location.href = '/';
        }, 1000);
      }
    }, (error) => {
      this.setState({ error });
    });
}

export default loader;
