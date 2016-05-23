function StickyNotesController($scope, $http, $rootScope) {

    $scope.gridsterOpts = {
        minRows: 2, // the minimum height of the grid, in rows
        maxRows: 100,
        columns: 6, // the width of the grid, in columns
        colWidth: 'auto', // can be an integer or 'auto'.  'auto' uses the pixel width of the element divided by 'columns'
        rowHeight: 'match', // can be an integer or 'match'.  Match uses the colWidth, giving you square widgets.
        margins: [50, 50], // the pixel distance between each widget
        defaultSizeX: 2, // the default width of a gridster item, if not specifed
        defaultSizeY: 1, // the default height of a gridster item, if not specified
        mobileBreakPoint: 600, // if the screen is not wider that this, remove the grid layout and stack the items
        resizable: {
            enabled: true,
            start: function(event, uiWidget, $element) {}, // optional callback fired when resize is started,
            resize: function(event, uiWidget, $element) {}, // optional callback fired when item is resized,
            stop: function(event, uiWidget, $element) {} // optional callback fired when item is finished resizing
        },
        draggable: {
            enabled: true, // whether dragging items is supported
            handle: '.dragHandle', // optional selector for resize handle
            start: function(event, uiWidget, $element) {}, // optional callback fired when drag is started,
            drag: function(event, uiWidget, $element) {}, // optional callback fired when item is moved,
            stop: function(event, uiWidget, $element) {} // optional callback fired when item is finished dragging
        }
    };

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

    $scope.create = function(stickyNote) {
        var that = this;

        $http.post('/api/stickynote/', {
            title: 'Title',
            note: '...'
        }).then(function(result) {
            if (result.data.success) {
                console.log(result.data);
                var newStickyId = result.data.noteId;

                $scope.stickyNotes.push({
                    size: {
                        x: 1,
                        y: 1
                    },
                    position: [2, 2],
                    id: newStickyId,
                    note: '...',
                    title: 'Title'
                })

            } else {
                return $rootScope.$broadcast("alert:add", {
                    msg: result.err,
                    type: "danger"
                });
            }
        });

    };

    $scope.edit = function(stickyNote) {
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
