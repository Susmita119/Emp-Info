import React from "react";
import { Button } from "reactstrap";

class CustomButton extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {

    console.log("this.props.onClickApprove: ", this.props.onClickApprove)


    return (
      <div>
        <Button color="success" onClick={() => this.props.onClickApprove(this.props.users)}>
          {" "}
          Approve{" "}
        </Button>
        &nbsp;
        <Button color="primary" onClick={this.clicked}>
          {" "}
          View{" "}
        </Button>
        &nbsp;
        <Button color="info" onClick={this.clicked}>
          {" "}
          Edit{" "}
        </Button>
      </div>
    );
  }
}

export default CustomButton;
