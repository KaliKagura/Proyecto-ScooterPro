import { useEffect, useState } from "react";

const ProductosAdmin = () => {
    // Estados para manejar productos, formulario, edición, búsqueda y datos del formulario
    const [productos, setProductos] = useState([]);
    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [modoEdicion, setModoEdicion] = useState(false);
    const [productoEditando, setProductoEditando] = useState(null);
    const [busqueda, setBusqueda] = useState("");
    const [formData, setFormData] = useState({
        nombre: "",
        descripcion: "",
        precio: "",
        stock: "",
        imagen_url: "",
        tipo_producto: "",
        marca: "",
    });

    // Obtener productos al cargar el componente
    const fetchProductos = async () => {
        try {
            const res = await fetch("http://localhost:5000/productos");
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Error desconocido");
            setProductos(data);
        } catch (error) {
            console.error("Error al obtener productos:", error);
        }
    };

    useEffect(() => {
        fetchProductos();
    }, []);

    // Actualizar campos del formulario
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Enviar formulario para crear o editar producto
    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = modoEdicion
            ? `http://localhost:5000/productos/${productoEditando}`
            : "http://localhost:5000/productos";

        const method = modoEdicion ? "PUT" : "POST";

        try {
            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (!res.ok) {
                alert("Error: " + (data.error || "Error desconocido"));
            } else {
                alert(modoEdicion ? "Producto actualizado" : "Producto creado");
                // Reiniciar estados después de guardar
                setFormData({
                    nombre: "",
                    descripcion: "",
                    precio: "",
                    stock: "",
                    imagen_url: "",
                    tipo_producto: "",
                    marca: "",
                });
                setMostrarFormulario(false);
                setModoEdicion(false);
                setProductoEditando(null);
                fetchProductos();
            }
        } catch (error) {
            console.error("Error en la petición:", error);
            alert("Error en la petición");
        }
    };

    // Cargar datos del producto en el formulario para editar
    const handleEditar = (producto) => {
        setFormData({
            nombre: producto.nombre,
            descripcion: producto.descripcion,
            precio: producto.precio,
            stock: producto.stock,
            imagen_url: producto.imagen_url,
            tipo_producto: producto.tipo_producto,
            marca: producto.marca,
        });
        setProductoEditando(producto.id);
        setModoEdicion(true);
        setMostrarFormulario(true);
    };

    // Eliminar producto por ID
    const handleEliminar = async (id) => {
        if (!window.confirm("¿Estás seguro de eliminar este producto?")) return;

        try {
            const res = await fetch(`http://localhost:5000/productos/${id}`, {
                method: "DELETE",
            });
            const data = await res.json();

            if (!res.ok) {
                alert("Error al eliminar producto: " + (data.error || "Error desconocido"));
            } else {
                alert("Producto eliminado correctamente");
                setProductos((prev) => prev.filter((producto) => producto.id !== id));
            }
        } catch (error) {
            console.error("Error al eliminar producto:", error);
            alert("Error al eliminar producto");
        }
    };
    // administracion productos
    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold">Gestión de Productos</h2>
                <button
                    onClick={() => {
                        setMostrarFormulario(!mostrarFormulario);
                        setModoEdicion(false);
                        setFormData({
                            nombre: "",
                            descripcion: "",
                            precio: "",
                            stock: "",
                            imagen_url: "",
                            tipo_producto: "",
                            marca: "",
                        });
                    }}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded shadow"
                >
                    {mostrarFormulario ? "Cancelar" : "+ Agregar Producto"}
                </button>
            </div>

            {/* Búsqueda */}
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Buscar por nombre o marca..."
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                    className="w-full p-2 border rounded shadow-sm"
                />
            </div>

            {mostrarFormulario && (
                <form
                    onSubmit={handleSubmit}
                    className="grid grid-cols-2 gap-4 mb-6 bg-gray-50 p-4 rounded-lg border"
                >
                    <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} placeholder="Nombre" className="border p-2 rounded" required />
                    <input type="text" name="descripcion" value={formData.descripcion} onChange={handleChange} placeholder="Descripción" className="border p-2 rounded" />
                    <input type="number" name="precio" value={formData.precio} onChange={handleChange} placeholder="Precio" className="border p-2 rounded" required />
                    <input type="number" name="stock" value={formData.stock} onChange={handleChange} placeholder="Stock" className="border p-2 rounded" required />
                    <input type="text" name="imagen_url" value={formData.imagen_url} onChange={handleChange} placeholder="URL de la imagen" className="border p-2 rounded" />
                    <input type="text" name="tipo_producto" value={formData.tipo_producto} onChange={handleChange} placeholder="Tipo de producto" className="border p-2 rounded" />
                    <input type="text" name="marca" value={formData.marca} onChange={handleChange} placeholder="Marca" className="border p-2 rounded" />
                    <button type="submit" className="col-span-2 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
                        {modoEdicion ? "Actualizar Producto" : "Guardar Producto"}
                    </button>
                </form>
            )}

            <table className="w-full text-left border border-gray-200 shadow-sm rounded overflow-hidden">
                <thead className="bg-blue-50 text-blue-800">
                    <tr>
                        <th className="py-3 px-4 border-b">Imagen</th>
                        <th className="py-3 px-4 border-b">Nombre</th>
                        <th className="py-3 px-4 border-b">Marca</th>
                        <th className="py-3 px-4 border-b">Descripción</th>
                        <th className="py-3 px-4 border-b">Precio</th>
                        <th className="py-3 px-4 border-b">Stock</th>
                        <th className="py-3 px-4 border-b">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {productos
                        .filter((producto) => {
                            const texto = busqueda.toLowerCase();
                            return (
                                producto.nombre.toLowerCase().includes(texto) ||
                                producto.marca?.toLowerCase().includes(texto)
                            );
                        })
                        .map((producto) => (
                            <tr key={producto.id} className="hover:bg-blue-50 transition-all">
                                <td className="py-3 px-4 border-b">
                                    {producto.imagen_url ? (
                                        <img src={producto.imagen_url} alt={producto.nombre} className="w-16 h-16 object-cover rounded" />
                                    ) : (
                                        <span className="text-gray-400 text-sm">Sin imagen</span>
                                    )}
                                </td>
                                <td className="py-3 px-4 border-b">{producto.nombre}</td>
                                <td className="py-3 px-4 border-b">{producto.marca || "—"}</td>
                                <td className="py-3 px-4 border-b">{producto.descripcion}</td>
                                <td className="py-3 px-4 border-b">${producto.precio?.toLocaleString()}</td>
                                <td className="py-3 px-4 border-b">{producto.stock}</td>
                                <td className="py-3 px-4 border-b">
                                    <div className="flex flex-col items-center space-y-2">
                                        <button
                                            onClick={() => handleEditar(producto)}
                                            className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-1 rounded text-sm shadow-sm"
                                        >
                                            Editar
                                        </button>
                                        <button
                                            onClick={() => handleEliminar(producto.id)}
                                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm shadow-sm"
                                        >
                                            Eliminar
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProductosAdmin;
