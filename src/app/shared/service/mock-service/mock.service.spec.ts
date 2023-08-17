import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import {  MatDialog, MatDialogModule } from '@angular/material/dialog'; // Import MatDialog and MatDialogModule
import { MatSnackBar } from '@angular/material/snack-bar';
import { UtilityService } from '../utility/utility.service';
import { MockService } from './mock.service';

describe('MockService', () => {
  let service: MockService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MatDialogModule], // Include MatDialogModule
      providers: [MockService, UtilityService, MatDialog, MatSnackBar] // Provide MatDialog
    });
    service = TestBed.inject(MockService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch data', () => {
    const configuration = {
      group: 'example',
      key: 'data',
      muteNotifyError: false
    };

    const responseData = {
      data: {
        "seats" : {
            "items": [
              {
                "bookingDate": "02-08-2023",
                "userId": "sgd.daran@gmail.com",
                "bookingId": 1,
                "status": "Active",
                "seatInformation": {
                  "locationId": "TCO",
                  "blockId": "SDB2",
                  "floorId": "F1",
                  "seatId": "A102"
                }
              },
              {
                "bookingDate": "07-08-2023",
                "userId": "sgd.daran@gmail.com",
                "bookingId": 2,
                "status": "Active",
                "seatInformation": {
                  "locationId": "KOC",
                  "blockId": "SDB1",
                  "floorId": "F2",
                  "seatId": "M306"
                }
              },
              {
                "bookingDate": "07-08-2023",
                "userId": "sgd.daran@gmail.com",
                "bookingId": 2,
                "status": "Active",
                "seatInformation": {
                  "locationId": "KOC",
                  "blockId": "SDB1",
                  "floorId": "F2",
                  "seatId": "M306"
                }
              },
              {
                "bookingDate": "07-08-2023",
                "userId": "sgd.daran@gmail.com",
                "bookingId": 2,
                "status": "Active",
                "seatInformation": {
                  "locationId": "KOC",
                  "blockId": "SDB1",
                  "floorId": "F2",
                  "seatId": "M306"
                }
              },
              {
                "bookingDate": "07-08-2023",
                "userId": "sgd.daran@gmail.com",
                "bookingId": 2,
                "status": "Active",
                "seatInformation": {
                  "locationId": "KOC",
                  "blockId": "SDB1",
                  "floorId": "F2",
                  "seatId": "M306"
                }
              },
              {
                "bookingDate": "06-08-2023",
                "userId": "sgd.daran@gmail.com",
                "bookingId": 3,
                "status": "Active",
                "seatInformation": {
                  "locationId": "TCO",
                  "blockId": "SDB2",
                  "floorId": "F1",
                  "seatId": "A302"
                }
              },
              {
                "bookingDate": "06-08-2023",
                "userId": "sgd.daran@gmail.com",
                "bookingId": 3,
                "status": "Active",
                "seatInformation": {
                  "locationId": "TCO",
                  "blockId": "SDB2",
                  "floorId": "F1",
                  "seatId": "A302"
                }
              },
              {
                "bookingDate": "14-08-2023",
                "userId": "sgd.daran@gmail.com",
                "bookingId": 6,
                "status": "Active",
                "seatInformation": {
                  "locationId": "TCO",
                  "blockId": "SDB2",
                  "floorId": "F1",
                  "seatId": "A102"
                }
              },
              {
                "bookingDate": "14-08-2023",
                "userId": "sgd.daran@gmail.com",
                "bookingId": 6,
                "status": "Active",
                "seatInformation": {
                  "locationId": "TCO",
                  "blockId": "SDB2",
                  "floorId": "F1",
                  "seatId": "A102"
                }
              },
              {
                "bookingDate": "14-08-2023",
                "userId": "sgd.daran@gmail.com",
                "bookingId": 6,
                "status": "Active",
                "seatInformation": {
                  "locationId": "TCO",
                  "blockId": "SDB2",
                  "floorId": "F1",
                  "seatId": "A102"
                }
              },
              {
                "bookingDate": "14-08-2023",
                "userId": "sgd.daran@gmail.com",
                "bookingId": 6,
                "status": "Active",
                "seatInformation": {
                  "locationId": "TCO",
                  "blockId": "SDB2",
                  "floorId": "F1",
                  "seatId": "A102"
                }
              },
              {
                "bookingDate": "14-08-2023",
                "userId": "sgd.daran@gmail.com",
                "bookingId": 6,
                "status": "Active",
                "seatInformation": {
                  "locationId": "TCO",
                  "blockId": "SDB2",
                  "floorId": "F1",
                  "seatId": "A102"
                }
              },
              {
                "bookingDate": "14-08-2023",
                "userId": "sgd.daran@gmail.com",
                "bookingId": 6,
                "status": "Active",
                "seatInformation": {
                  "locationId": "TCO",
                  "blockId": "SDB2",
                  "floorId": "F1",
                  "seatId": "A102"
                }
              }
            ],
            "_meta": {
              "message": "Success",
              "status": 200
            }
          }
    }
    };

    service.fetchData(configuration).subscribe(result => {
      expect(result).toEqual(responseData.data);
    });

    const req = httpTestingController.expectOne(`/assets/mock/${configuration.group}.json`);
    expect(req.request.method).toBe('GET');
    req.flush(responseData);
  });

  it('should handle errors and show alert', () => {
    const configuration = {
      group: 'example',
      key: 'data',
      muteNotifyError: false
    };

    const errorMessage = '[ HttpErrorResponse({ headers: HttpHeaders({ normalizedNames: Map(  ), lazyUpdate: null, headers: Map(  ) }), status: 0, statusText: \'Unknown Error\', url: \'/assets/mock/example.json\', ok: false, name: \'HttpErrorResponse\', message: \'Http failure response for /assets/mock/example.json: 0 \', error: [object ErrorEvent] }) ]';

    spyOn(service['utilityService'], 'showErrorAlert'); // Spy on the utilityService's method

    service.fetchData(configuration).subscribe(
      () => {},
      error => {
        expect(service['utilityService'].showErrorAlert).toHaveBeenCalled();
      }
    );

    const req = httpTestingController.expectOne(`/assets/mock/${configuration.group}.json`);
    req.error(new ErrorEvent('Network error', { error: errorMessage }));
  });
});
