import "./style.scss";
import { Row } from "@canonical/react-components";
import { Col } from "@canonical/react-components";
import { Card } from "@canonical/react-components";
import React, { Component } from "react";
import Moment from "moment";

export default class BlogPost extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    fetch("https://people.canonical.com/~anthonydillon/wp-json/wp/v2/posts")
      .then((results) => results.json())
      .then((results) => {
        // console.log(results);
        this.setState({ data: results });
      });
  }

  render() {
    return (
      <div className="blog-posts">
        <Row>
          {this.state.data.map(function (item, index) {
            return (
              <Col size={4}>
                <Card className="canonicalCard">
                  <div className="topText">
                    {item._embedded["wp:term"][1].map((name, idx) => {
                      return (
                        <span className="categories" key={idx}>
                          {(idx ? ", " : "") + name.name}
                        </span>
                      );
                    })}
                  </div>
                  <img key={item.index} src={item.featured_media} />
                  <a href={item.link}>
                    <h3 key={item.index} className="postTitle">
                      {item.title.rendered}
                    </h3>
                  </a>
                  <p className="postMeta">
                    {item._embedded.author.map((author, idx) => {
                      return (
                        <p key={idx}>
                          By <a href={author.link}>{author.name}</a> on{" "}
                          {Moment(item.date).format("Do MMMM YYYY")}
                        </p>
                      );
                    })}
                  </p>

                  <div className="bottomText">
                    {item._embedded["wp:term"][0].map((name, idx) => {
                      return (
                        <p className="categories" key={idx}>
                          {name.name}
                        </p>
                      );
                    })}
                  </div>
                </Card>
              </Col>
            );
          })}
        </Row>
      </div>
    );
  }
}

//
