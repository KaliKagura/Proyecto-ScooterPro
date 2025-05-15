import "./Catalogo.css";

export default function Catalogo() {
    return (
    <div>
        
        <h1>
            Productos
        </h1>

        <div className = "container-items">
                <div className = "item">
                    <figure>
                        <img 
                    src="https://media.istockphoto.com/id/1182801851/es/foto/scooter-el%C3%A9ctrico-aislado.jpg?s=612x612&w=0&k=20&c=Ao7aNEIfBsmHNjRWkK4mfM8JIBtqBPZMo87_-PgbYy4=" 
                    alt="Scooter Eléctrico" />
                    </figure>
                    <div className = "info-product">
                        <h2>Scooter eléctrico</h2>
                        <p className = "price">$100</p>
                        <button className = "btn">Agregar al carrito</button>
                    </div>
                </div>


                <div className = "item">
                    <figure>
                        <img 
                    src="https://mistorechile.cl/wp-content/uploads/2023/09/group-9-2d01ac87-e59e-45ba-ad69-60282ba80fd6.jpg" 
                    alt="Scooter Eléctrico" />
                    </figure>
                    <div className = "info-product">
                        <h2>Scooter Xiaomi</h2>
                        <p className = "price">$100</p>
                        <button className = "btn">Agregar al carrito</button>
                    </div>
                </div>


                <div className = "item">
                    <figure>
                        <img 
                    src="https://ecomove.com.ec/wp-content/uploads/2020/01/S3.jpg" 
                    alt="Scooter Eléctrico" />
                    </figure>
                    <div className = "info-product">
                        <h2>Scooter ecomove</h2>
                        <p className = "price">$100</p>
                        <button className = "btn">Agregar al carrito</button>
                    </div>
                </div>

            </div>

    </div>
    );
}