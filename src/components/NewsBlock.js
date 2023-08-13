
const NewsBlock = (props) => {
    return <div>
        {props.collectionNews.map(item => (
            <div className="my-5  container flex flex-col items-center ">
                <h1 className=" text-center font-normal font-mono text-xl my-1 ">{item.title}</h1>
                <p className="text-center font-light text-base">{item.content}</p>
            </div>
        ))}
    </div>
}

export default NewsBlock;