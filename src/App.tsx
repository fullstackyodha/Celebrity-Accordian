import React, { useState } from "react";

import { celeberities } from "./data/celebrities";

import "./App.css";

import Input from "./components/Input";
import Button from "./components/Button";

import {
	FaChevronDown,
	FaChevronUp,
	FaRegTrashAlt,
	FaPen,
} from "react-icons/fa";
import { FaRegCircleCheck } from "react-icons/fa6";
import { RxCross1 } from "react-icons/rx";
import Dropdown from "./components/Dropdown";

type celebType = {
	first: string;
	last: string;
	picture: string;
	id: number;
	dob: string;
	gender: string;
	email: string;
	country: string;
	description: string;
};

function App() {
	let [celebrityData, setCelebrityData] =
		useState<celebType[]>(celeberities);
	const [state, setState] = useState("close");
	const [selected, setSelected] = useState(-1);
	const [searchValue, setSearchValue] = useState("");
	const [isEdit, setIsEdit] = useState(false);

	const [name, setName] = useState("");
	const [dob, setDob] = useState("");
	const [gender, setGender] = useState("");
	const [country, setCountry] = useState("");
	const [desc, setDesc] = useState("");

	const [openModal, setOpenModal] = useState(false);

	const handleOpenModal = () => setOpenModal(true);

	const handleCloseModal = () => setOpenModal(false);

	// SEARCHING
	if (searchValue.length > 0) {
		celebrityData = celebrityData.filter((celeb) =>
			celeb?.first
				.toLowerCase()
				.concat(" " + celeb?.last.toLowerCase())
				.includes(searchValue.toLowerCase())
		);
	}

	function handleUpdateCelebrity() {
		// console.log({ selected, name, dob, country, desc });

		celebrityData = celebrityData.map((celeb) => {
			if (celeb?.id === selected) {
				celeb = {
					...celeb,
					first: name.split(" ")[0],
					last: name.split(" ").splice(1).join(" "),
					dob,
					gender,
					country,
					description: desc,
				};

				return celeb;
			}

			return celeb;
		});

		setCelebrityData([...celebrityData]);
	}

	function handleDeleteCeleb() {
		celebrityData = celebrityData.filter(
			(celeb) => celeb?.id !== selected
		);

		setCelebrityData([...celebrityData]);
	}

	function hasChanged() {
		const celeb = celebrityData.find(
			(celeb) => celeb?.id === selected
		);

		return (
			name !== celeb?.first + " " + celeb?.last ||
			dob !== celeb?.dob ||
			gender !== celeb?.gender ||
			country !== celeb?.country ||
			desc !== celeb?.description
		);
	}

	function isAdult(dob: string): boolean {
		return getAge(dob) >= 18;
	}

	function getAge(dob: string): number {
		const currentYear = new Date().getFullYear();

		return currentYear - Number(dob.split("-")[0]);
	}

	return (
		<div className="container">
			{/* SEARCH BAR */}
			<div className="input-container">
				<Input
					type="text"
					placeholder="Search Celebrity"
					value={searchValue}
					disabled={false}
					onChange={(
						e: React.ChangeEvent<HTMLInputElement>
					) => setSearchValue(e.target?.value)}
					className="searchInput"
				/>
			</div>

			{/* DELETE MODAL */}
			{openModal && (
				<div className="backdrop">
					<div className="modal-container">
						<div className="modal-header">
							<div>Are you sure you want to delete?</div>
							<div onClick={handleCloseModal}>
								<RxCross1 fontSize={"1.4rem"} />
							</div>
						</div>

						<div className="modal-footer">
							<Button
								type="button"
								disabled={false}
								className="cancel-btn"
								onClick={handleCloseModal}
								text="Cancel"
							/>
							<Button
								type="button"
								disabled={false}
								className="finaldelete-btn"
								onClick={() => {
									handleDeleteCeleb();
									handleCloseModal();
								}}
								text="Delete"
							/>
						</div>
					</div>
				</div>
			)}

			{/* ACCRODIAN */}
			<div className="accordian-container">
				{celebrityData.map((celeb) => {
					return (
						<div
							key={celeb.id}
							className={`accordian-close ${
								celeb.id === selected && `accordian-open`
							} `}>
							{/* HEADER */}
							<div className="accordian-header">
								<div className="accordian-detail">
									<img
										src={`${celeb.picture}`}
										className="celeb-picture"
										alt=""
									/>

									<p className="celeb-name">
										{celeb.id === selected && isEdit ? (
											<Input
												type="text"
												className="name-input"
												// value={`${celeb.first} ${celeb.last}`}
												value={name}
												disabled={false}
												placeholder=""
												onChange={(e) =>
													setName(e.target.value)
												}
											/>
										) : (
											`${celeb.first} ${celeb.last}`
										)}
									</p>
								</div>

								{/* OPEN OR CLOSE ICONS */}
								<div>
									{selected !== celeb.id && (
										<Button
											type="button"
											onClick={() => {
												setSelected((selected: number) =>
													selected === celeb.id
														? -1
														: celeb.id
												);
												setIsEdit(false);

												setState("open");
											}}
											text={
												<FaChevronDown
													fontSize={"1.5rem"}
												/>
											}
											disabled={isEdit}
											className="icon"
										/>
									)}

									{state === "open" &&
										selected === celeb.id && (
											<Button
												type="button"
												onClick={() => {
													setSelected((selected: number) =>
														selected === celeb.id
															? -1
															: celeb.id
													);
													setIsEdit(false);
													setState("close");
												}}
												text={
													<FaChevronUp
														fontSize={"1.5rem"}
													/>
												}
												disabled={false}
												className="icon"
											/>
										)}
								</div>
							</div>

							{/* DETAIL */}
							{selected === celeb.id &&
								state === "open" && (
									<div className="accordian-details">
										{/* ROW 1 */}
										<div className="accordian-detail-row-1">
											<div>
												<div className="title">Age</div>
												<div>
													{celeb.id === selected &&
													isEdit ? (
														<Input
															type="date"
															className="age-input"
															value={celeb.dob}
															disabled={false}
															placeholder=""
															onChange={(e) =>
																setDob(e.target.value)
															}
														/>
													) : (
														getAge(celeb.dob) + " Years"
													)}
												</div>
											</div>

											<div>
												<div className="title">Gender</div>
												<div>
													{celeb.id === selected &&
													isEdit ? (
														<Dropdown
															value={gender}
															className="gender-input"
															onChange={(e) =>
																setGender(e.target.value)
															}
														/>
													) : (
														celeb.gender[0]
															.toUpperCase()
															.concat(celeb.gender.slice(1))
													)}
												</div>
											</div>

											<div>
												<div className="title">Country</div>
												<div>
													{isEdit ? (
														<Input
															type="text"
															className="country-input"
															value={country}
															disabled={false}
															placeholder=""
															onChange={(e) =>
																setCountry(e.target.value)
															}
														/>
													) : (
														celeb.country
													)}
												</div>
											</div>
										</div>

										{/* ROW 2 */}
										<div className="desc-container">
											<div className="title">
												Description
											</div>
											<div>
												{celeb.id === selected && isEdit ? (
													<textarea
														title="desc"
														className="description-input"
														onChange={(e) =>
															setDesc(e.target.value)
														}
														value={desc}
														cols={28}
														rows={7}></textarea>
												) : (
													celeb.description
												)}
											</div>
										</div>

										{/* EDIT & DELETE BUTTONS */}
										<div className="accordian-buttons">
											{celeb.id === selected && isEdit ? (
												<Button
													text={
														<RxCross1 fontSize={"1.4rem"} />
													}
													disabled={false}
													type="button"
													onClick={() => setIsEdit(false)}
													className="delete-btn"
												/>
											) : (
												<Button
													text={
														<FaRegTrashAlt
															fontSize={"1.3rem"}
														/>
													}
													disabled={false}
													type="button"
													onClick={() => handleOpenModal()}
													className="delete-btn"
												/>
											)}

											{celeb.id === selected && isEdit ? (
												<Button
													text={
														<FaRegCircleCheck
															fontSize={"1.5rem"}
														/>
													}
													// STAYS DISABLED IS DATA IS UNCHANGED
													disabled={!hasChanged()}
													type="button"
													onClick={() => {
														handleUpdateCelebrity();

														setIsEdit(false);
													}}
													className="save-btn"
												/>
											) : (
												<Button
													text={
														<FaPen fontSize={"1.3rem"} />
													}
													disabled={!isAdult(celeb.dob)}
													type="button"
													onClick={() => {
														setIsEdit(true);
														setName(
															`${celeb.first} ${celeb.last}`
														);
														// const age = getAge(celeb.dob);
														setDob(celeb.dob);
														setGender(celeb.gender);
														setCountry(celeb.country);
														setDesc(celeb.description);
													}}
													className="edit-btn"
												/>
											)}
										</div>
									</div>
								)}
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default App;
