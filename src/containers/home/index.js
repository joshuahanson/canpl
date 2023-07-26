import React from "react";
// import Players from "../../components/Players";
import Games from "../../components/Games"
import SortBar from "../../components/SortBar";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      role: "",
      sortedBy: "",
    };
  }

  componentWillUnmount() {
    this.setState({ role: "", sortedBy: "" });
  }

  render() {
    const { history } = this.props;
    const role = this.state.role;
    const sortedBy = this.state.sortedBy;
    return (
      <div className="App">
        <Games />
        <SortBar role={role} sortedBy={sortedBy} history={history} />
        {/* <Players {...this.props} /> */}
      </div>
    );
  }
}

export default Home;
