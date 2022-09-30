import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

// My Import here:
import { shallow } from "enzyme";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

// My Tests here:
it("renders correctly", () => {
  const wrapper = shallow(<App />);
  expect(wrapper).toMatchSnapshot();
});

it("calls componentDidMount", () => {
  jest.spyOn(App.prototype, "componentDidMount");
  const wrapper = shallow(<App />);
  expect(App.prototype.componentDidMount.mock.calls.length).toBe(1);
});
