import Posts from "../../components/posts/Posts"
import SharePost from "../../components/SharePost"
import "./home.scss"

const Home = () => {
  return (
    <div className="home">
      {/* <Stories/>
      <Share/> */}
      
      <SharePost/>
      <Posts/>
    </div>
  )
}

export default Home