function StickyNotesController($scope, $http, $rootScope) {

    $scope.stickyNotes = [];

    $scope.fetchNotes = function() {
        $http.get('/api/stickynote/').then(function(result) {
            if (result.data.success) {
                var stickyNotes = result.data.stickyNotes;

                var stickyNoteKeys = Object.keys(stickyNotes);

                for (var i = 0; i < stickyNoteKeys.length; i++) {
                    var key = stickyNoteKeys[i];

                    $scope.stickyNotes.push({
                        size: {
                            x: 1,
                            y: 1
                        },
                        position: [2, 2],
                        id: key,
                        note: stickyNotes[key].note,
                        title: stickyNotes[key].title,
                        modifiedAt: stickyNotes[key].modifiedAt
                    })
                }

            } else {
                return $rootScope.$broadcast("alert:add", {
                    msg: result.err,
                    type: "danger"
                });
            }
        });
    };

    $scope.fetchNote = function(stickyNote, toUpdateModifiedAt) {
        $http.get('/api/stickynote/' + stickyNote.id).then(function(result) {
            if (result.data.success) {
                if (toUpdateModifiedAt) {
                    stickyNote.modifiedAt = result.data.stickyNote.modifiedAt;
                }
            } else {
                return $rootScope.$broadcast("alert:add", {
                    msg: result.err,
                    type: "danger"
                });
            }
        });
    };

    $scope.edit = function(stickyNote) {
        console.log("Updating ", stickyNote);
        var that = this;

        $http.put('/api/stickynote/' + stickyNote.id, {
            title: stickyNote.title,
            note: stickyNote.note
        }).then(function(result) {
            if (result.data.success) {
                that.fetchNote(stickyNote, true);

                return $rootScope.$broadcast("alert:add", {
                    msg: "Sticky note successfully updated.",
                    type: "success"
                });
            } else {
                return $rootScope.$broadcast("alert:add", {
                    msg: result.err,
                    type: "danger"
                });
            }
        });

    };

    $scope.delete = function(stickyNote) {
        $http.delete('/api/stickynote/' + stickyNote.id).then(function(result) {
            if (result.data.success) {
                var idx = $scope.stickyNotes.indexOf(stickyNote);
                if (idx >= 0) {
                    $scope.stickyNotes.splice(idx, 1);
                }

                return $rootScope.$broadcast("alert:add", {
                    msg: "Sticky note successfully deleted.",
                    type: "success"
                });
            } else {
                return $rootScope.$broadcast("alert:add", {
                    msg: result.err,
                    type: "danger"
                });
            }
        });
    };

    $scope.fetchNotes();

};

stickIt.component('stickyNotesComponent', {
    templateUrl: "/javascripts/components/stickyNotes.html",
    controller: StickyNotesController
});
