import "./productCard.css";

export default function ProductCard(props) {
    console.log(props.name)
    return (
        <div className="product-card">
            <img src={props.img} alt="Product" />
            <span className="product-name">{props.name}</span>
            <span className="price">{props.price}</span>
            <p>{props.description}</p>
        </div>
    );
}

