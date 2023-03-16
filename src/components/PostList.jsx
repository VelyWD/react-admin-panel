import React from "react";
import PostItem from "./PostItem";

class PostList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: []
        }
    }

    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/posts')
        .then((response) => {
            if(!response.ok) { //vedem daca avem vreo eroare la fetch
                throw new Error("Response did not succeed.");
            }
            return response.json();
        })
        .then((data) => {
            data = data.filter(post => post.id < 16)
            this.setState({posts: data});
        })
        .catch((error) => {
            console.error("There was a problem with the fetch operation: ", error);
        })
    }

    render() {
        const {users} = this.props;

        return(
            <div>
                {users.length != 0
                //daca se incarca lista de postari inainte de lista de useri, nu afisam nimic si asteptam pana primim userii,
                //iar daca exista o postare creata de un user cu id inexistent, atunci nu va fi afisata postarea
                ? this.state.posts.map((post, index) => {
                    //{users[post.userId - 1].name}
                    //console.log(users.find(user => user.id == post.userId));
                    //console.log(users);
                    return  (users[post.userId - 1] != undefined
                    ? <PostItem name={users[post.userId - 1].name} userId={post.userId} id={post.id} title={post.title} body={post.body} key={index}/>
                    : "")
                }) : ""}
            </div>
        );
    };
}

export default PostList;