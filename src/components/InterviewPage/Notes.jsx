const Notes = () => {
    return (
        <div className="flex items-center justify-center bg-gray-100 m-3 p-2 rounded-md shadow-md">
            <div className="m-4">
                <h1 className="text-2xl font-bold mb-0 -mt-1">Notes</h1>
                <div className="formholder">
                    <form>
                        <textarea name="notes" id="notes" cols="30" rows="10" className="mt-1 p-2 w-full border rounded-md focus:ring focus:ring-indigo-300 focus:border-indigo-300"></textarea>
                        <button type="submit"
                            className="px-4 py-1 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-300 hover:text-gray-800 transition-all duration-300 ease-in-out"
                            onClick={""}>Submit</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Notes;