import captainModel from '../models/captain.model.js';


export const createCaptain = async ({
    firstname,
    lastname,
    email,
    password,
    color,
    plate,
    capacity,
    vehicleType


}) => {
    if(!firstname || !email || !password || !color || !plate || !capacity || !vehicleType) {
        throw new Error('Firstname, email, password, vehicle color, plate, capacity and vehicle type are required');
    }
    const captain = new captainModel({
        fullname: {
            firstname,
            lastname
        },
        email,
        password,
        vehicle: {
            color,
            plate,
            capacity,
            vehicleType
        }
    });

    return await captain.save();

}
