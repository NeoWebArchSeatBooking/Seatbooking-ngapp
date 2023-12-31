export const schema = {
    "tableSchema": [
        {
            "field": "id",
            "label": "Booking Id",
            "type": "label"
        },
        {
            "field": "eId",
            "label": "User",
            "type": "label"
        },
        {
            "field": "date",
            "label": "Booking Date",
            "type": "label"
        },
        {
            "field": "seatingInfo.seat.seatId",
            "label": "Seat Id",
            "type": "label"
        },
        {
            "field": "seatingInfo.location.locationName",
            "label": "Location Name",
            "type": "label"
        },
        {
            "field": "seatingInfo.block.blockName",
            "label": "Block Name",
            "type": "label"
        },
        {
            "field": "seatingInfo.floor.floorId",
            "label": "Floor",
            "type": "label"
        },
        {
            "field": "status",
            "label": "Status",
            "type": "label"
        }
    ]
};