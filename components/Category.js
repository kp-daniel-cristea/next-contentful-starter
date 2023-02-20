function Category({ title, description }) {
    return (
        <div className="category">
            <div className="text">
                <p>{title}: {description}</p>
            </div>
        </div>
    )
}

export default Category