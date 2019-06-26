import React, { Component } from "react";
import ListChart from "./ListChart";
class App extends Component {
  state = {
    dataset : [
      { user: "abc1", value: 20, category: 7 },
      { user: "abc2", value: 20, category: 7 },
      { user: "abc3", value: 10, category: 9 },
      { user: "abc4", value: 8, category: 7 },
      { user: "abc5", value: 30, category: 8 },
      { user: "abc6", value: 40, category: 10 },
      { user: "abc7", value: 50, category: 14 },
      { user: "abc8", value: 60, category: 13 }
    ],
    margin : { top: 50, right: 50, bottom: 50, left: 50 }
  };
  render() {
    return (
      <div class="App">
        <ListChart dataset={this.state.dataset} margin={this.state.margin}/>
      </div>
    );
  }
}
export default App;
