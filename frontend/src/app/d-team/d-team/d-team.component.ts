import { Component } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import * as _ from 'lodash-es';
@Component({
  selector: 'app-d-team',
  templateUrl: './d-team.component.html',
  styleUrls: ['./d-team.component.scss'],
})
export class DTeamComponent {
  private gridApi;
  private gridColumnApi;

  allArrays = [['a', 'b', 'c'], ['d'], ['g', 'e', 'f']];

  keeper = ['Pant:9.5:DC', 'D Kartik:8.5:KKR'];

  batsman = [
    'Dhawan:10:DC',
    'N Rana:9:KKR',
    'R Tripati:9:KKR',
    'Morgan:8.5:KKR',
    'Gill:8.5:KKR',
    'P Shaw:8.5:DC',
    'S lyer:8.5:DC',
    'Hetmyer:8.5:DC',
  ];

  allRounder = [
    'Narine:9.5:KKR',
    'V lyer:9.5:KKR',
    'Patel:9:DC',
    'Shakib:8.5:KKR',
  ];

  bowler = [
    'A Khan:9:DC',
    'Ferguson:9:KKR',
    'Nortje:9:KKR',
    'Varun:9:KKR',
    'Ashwin:8.5:DC',
    'Rabada:8:DC',
    'T Curren:8:DC',
    'Mavi:8:DC',
  ];
  dreamPlayer = ['Pant:9.5:DC'];

  colDefs: ColDef[] = [
    { field: 'Id', sortable: true, width: 80, filter: true },
    {
      field: 'Player1',
      sortable: true,
      width: 150,
      filter: true,
    },
    {
      field: 'Player2',
      sortable: true,
      width: 150,
      filter: true,
    },
    { field: 'Player3', sortable: true, width: 150, filter: true },
    { field: 'Player4', sortable: true, width: 150, filter: true },
    { field: 'Player5', sortable: true, width: 150, filter: true },
    { field: 'Player6', sortable: true, width: 150, filter: true },
    { field: 'Player7', sortable: true, width: 150, filter: true },
    { field: 'Player8', sortable: true, width: 150, filter: true },
    { field: 'Player9', sortable: true, width: 150, filter: true },
    { field: 'Player10', sortable: true, width: 150, filter: true },
    { field: 'Player11', sortable: true, width: 150, filter: true },
  ];
  final: any[];
  statusBar: {
    statusPanels: (
      | { statusPanel: string; align: string }
      | { statusPanel: string; align?: undefined }
    )[];
  };
  result: any[];

  ngOnInit() {
    this.statusBar = {
      statusPanels: [
        {
          statusPanel: 'agTotalAndFilteredRowCountComponent',
          align: 'left',
        },
        {
          statusPanel: 'agTotalRowCountComponent',
          align: 'center',
        },
        { statusPanel: 'agFilteredRowCountComponent' },
        { statusPanel: 'agSelectedRowCountComponent' },
        { statusPanel: 'agAggregationComponent' },
      ],
    };
    let keeper = this.combinations(this.keeper);

    let bat3 = this.k_combinations(this.batsman, 3);

    let bat4 = this.k_combinations(this.batsman, 4);

    let bat5 = this.k_combinations(this.batsman, 5);

    let bat6 = this.k_combinations(this.batsman, 6);

    let resultBat = _.concat(bat3, bat4, bat5, bat6);

    var resultAll1 = this.k_combinations(this.allRounder, 1);

    var resultAll2 = this.k_combinations(this.allRounder, 2);

    var resultAll3 = this.k_combinations(this.allRounder, 3);

    var resultAll4 = this.k_combinations(this.allRounder, 4);

    let resultAll = _.concat(resultAll1, resultAll2, resultAll3, resultAll4);

    let bow3 = this.k_combinations(this.bowler, 3);

    let bow4 = this.k_combinations(this.bowler, 4);

    let bow5 = this.k_combinations(this.bowler, 5);

    let bow6 = this.k_combinations(this.bowler, 6);

    let resultBowl = _.concat(bow3, bow4, bow5, bow6);

    //console.log(this.allPossibleCases([this.combinations(this.keeper), resultBat, resultAll, resultBowl]));

    this.final = [];
    let i = 1;
    this.allPossibleCases([keeper, resultBat, resultAll, resultBowl]).map(
      (val) => {
        let item = val.split(',');
        if (_.size(item) == 11) {
          let sum =
            Number(item[1].split(':')[1]) +
            Number(item[2].split(':')[1]) +
            Number(item[3].split(':')[1]) +
            Number(item[4].split(':')[1]) +
            Number(item[5].split(':')[1]) +
            Number(item[6].split(':')[1]) +
            Number(item[7].split(':')[1]) +
            Number(item[8].split(':')[1]) +
            Number(item[9].split(':')[1]) +
            Number(item[10].split(':')[1]) +
            Number(item[0].split(':')[1]);
          let countTeamMember = 0;
          let dreamTeamCount = 0;
          for (let val of item) {
            if (val.split(':')[2] == item[1].split(':')[2]) {
              countTeamMember++;
            }
          }

          //&& dreamTeamCount == _.size(this.dreamPlayer)
          let dream = _.intersection(this.dreamPlayer, item);
          let result = _.size(dream) == _.size(this.dreamPlayer);
          if (
            sum <= 100 &&
            countTeamMember >= 4 &&
            countTeamMember <= 7 &&
            result
          ) {
            let pl = {
              Id: i++,
              Player1: item[0],
              Player2: item[1],
              Player3: item[2],
              Player4: item[3],
              Player5: item[4],
              Player6: item[5],
              Player7: item[6],
              Player8: item[7],
              Player9: item[8],
              Player10: item[9],
              Player11: item[10],
            };
            this.final.push(pl);
          }
        }
      }
    );
  }

  allPossibleCases(arr) {
    if (arr.length == 1) {
      return arr[0];
    } else {
      var result = [];
      var allCasesOfRest = this.allPossibleCases(arr.slice(1)); // recur with the rest of array
      for (var i = 0; i < allCasesOfRest.length; i++) {
        for (var j = 0; j < arr[0].length; j++) {
          result.push(arr[0][j] + ',' + allCasesOfRest[i]);
        }
      }
      return result;
    }
  }

  k_combinations(set, k) {
    var i, j, combs, head, tailcombs;

    // There is no way to take e.g. sets of 5 elements from
    // a set of 4.
    if (k > set.length || k <= 0) {
      return [];
    }

    // K-sized set has only one K-sized subset.
    if (k == set.length) {
      return [set];
    }

    // There is N 1-sized subsets in a N-sized set.
    if (k == 1) {
      combs = [];
      for (i = 0; i < set.length; i++) {
        combs.push([set[i]]);
      }
      return combs;
    }
    combs = [];
    for (i = 0; i < set.length - k + 1; i++) {
      // head is a list that includes only our current element.
      head = set.slice(i, i + 1);
      // We take smaller combinations from the subsequent elements
      tailcombs = this.k_combinations(set.slice(i + 1), k - 1);
      // For each (k-1)-combination we join it with the current
      // and store it to the set of k-combinations.
      for (j = 0; j < tailcombs.length; j++) {
        combs.push(head.concat(tailcombs[j]));
      }
    }
    return combs;
  }

  combinations(set) {
    var k, i, combs, k_combs;
    combs = [];

    // Calculate all non-empty k-combinations
    for (k = 1; k <= set.length; k++) {
      k_combs = this.k_combinations(set, k);
      for (i = 0; i < k_combs.length; i++) {
        combs.push(k_combs[i]);
      }
    }
    return combs;
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    this.result = this.final;
  }
}
