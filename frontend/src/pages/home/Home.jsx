import Posts from "../../components/Posts"
import SharePost from "../../components/SharePost"
import "./home.scss"

const Home = () => {
  return (
    <div className="home">      
      <SharePost/>
      <Posts/>
    </div>
  )
}

export default Home