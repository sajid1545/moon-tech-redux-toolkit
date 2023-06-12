import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { editProduct, toggleUpdateSuccess } from '../../features/products/productsSlice';

const EditProduct = () => {
	const { register, handleSubmit } = useForm();
	const location = useLocation();
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const productID = location.state;
	const product = useSelector((state) => state.products.products);

	const editableProduct = product.find((product) => product._id === productID);

	const { _id, model, brand, image, price, status, spec, keyFeature } = editableProduct;

	const { isLoading, updateSuccess } = useSelector((state) => state.products);

	useEffect(() => {
		if (!isLoading && updateSuccess) {
			toast.success('Product updated successfully', { id: 'updateProduct' });
			dispatch(toggleUpdateSuccess());
			navigate('/dashboard');
		}
	}, [isLoading, updateSuccess, dispatch, navigate]);

	const submit = (data) => {
		const product = {
			model: data.model,
			brand: data.brand,
			status: data.status === 'true' ? true : false,
			price: data.price,
			image: data.image,
			keyFeature: [data.keyFeature1, data.keyFeature2, data.keyFeature3, data.keyFeature4],
			spec: [],
		};
		dispatch(editProduct({ product, _id }));
	};

	return (
		<div className="flex justify-center items-center h-full ">
			<form
				className="shadow-lg p-10 rounded-md flex flex-wrap gap-3 max-w-3xl justify-between bg-white"
				onSubmit={handleSubmit(submit)}>
				<div className="flex flex-col w-full max-w-xs">
					<label className="mb-2" htmlFor="model">
						Model
					</label>
					<input type="text" id="model" defaultValue={model} {...register('model')} />
				</div>
				<div className="flex flex-col w-full max-w-xs">
					<label className="mb-2" htmlFor="image">
						Image
					</label>
					<input type="text" name="image" id="image" defaultValue={image} {...register('image')} />
				</div>

				<div className="flex flex-col w-full max-w-xs">
					<label className="mb-3" htmlFor="brand">
						Brand
					</label>
					<select name="brand" id="brand" defaultValue={brand} {...register('brand')}>
						<option value="amd">AMD</option>
						<option value="intel">Intel</option>
					</select>
				</div>
				<div className="flex flex-col w-full max-w-xs">
					<label className="mb-2" htmlFor="price">
						Price
					</label>
					<input type="text" name="price" id="price" defaultValue={price} {...register('price')} />
				</div>

				<div className="flex flex-col w-full max-w-xs">
					<h1 className="mb-3">Availability</h1>
					<div className="flex gap-3">
						<div>
							<input type="radio" id="available" value={true} {...register('status')} />
							<label className="ml-2 text-lg" htmlFor="available">
								Available
							</label>
						</div>
						<div>
							<input
								type="radio"
								id="stockOut"
								name="status"
								value={false}
								{...register('status')}
							/>
							<label className="ml-2 text-lg" htmlFor="stockOut">
								Stock out
							</label>
						</div>
					</div>
				</div>
				<div className="flex flex-col w-full max-w-xs"></div>
				<div className="flex flex-col w-full max-w-xs">
					<label className="mb-2" htmlFor="keyFeature1">
						Key Feature 1
					</label>
					<input
						type="text"
						name="keyFeature1"
						id="keyFeature1"
						defaultValue={keyFeature[0]}
						{...register('keyFeature1')}
					/>
				</div>
				<div className="flex flex-col w-full max-w-xs">
					<label className="mb-2" htmlFor="keyFeature2">
						Key Feature 2
					</label>
					<input
						type="text"
						name="keyFeature2"
						id="keyFeature2"
						defaultValue={keyFeature[1]}
						{...register('keyFeature2')}
					/>
				</div>
				<div className="flex flex-col w-full max-w-xs">
					<label className="mb-2" htmlFor="keyFeature3">
						Key Feature 3
					</label>
					<input
						type="text"
						name="keyFeature3"
						id="keyFeature3"
						defaultValue={keyFeature[2]}
						{...register('keyFeature3')}
					/>
				</div>
				<div className="flex flex-col w-full max-w-xs">
					<label className="mb-2" htmlFor="keyFeature4">
						Key Feature 4
					</label>
					<input
						type="text"
						name="keyFeature4"
						id="keyFeature4"
						defaultValue={keyFeature[3]}
						{...register('keyFeature4')}
					/>
				</div>

				<div className="flex justify-between items-center w-full">
					<button
						className=" px-4 py-3 bg-indigo-500 rounded-md font-semibold text-white text-lg disabled:bg-gray-500"
						type="submit">
						Submit
					</button>
				</div>
			</form>
		</div>
	);
};

export default EditProduct;
