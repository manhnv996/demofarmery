/**
 * Created by CPU60133_LOCAL on 11/9/2017.
 */

var PlantCtrl = cc.Class.extend({

    onFieldSelected: function(fieldId) {
        /*
         INPROGRESS

         get Field Object by id
         check fieldstatus

         show popup view (seed / or croptool) IN MAPVIEW
         */
        var fieldSelected = user.getAsset().getFieldById(fieldId);
        var status = fieldSelected.checkStatus();

        if (status == FieldStatusTypes.EMPTY){
            /*
            Show seedtable
             */
            MapLayer.instance.showPopup();

        } else if (status == FieldStatusTypes.DONE){
            /*
            Show croptool
             */
        } else {
            /*
            Show status
             */
        }

    },
    onDragCropTool: function(x, y) {
        //
        var fieldSelected = MapCtrl.instance.getField(x, y);

        var status = fieldSelected.checkStatus();

        if (status == FieldStatusTypes.DONE){
            //
            if (fieldSelected.crop() == null){  //crop and check crop fail

                //full foodStorage
                /*
                 FLOW UpgradeStorage
                 */
            }

            //send msg to server {packet{fieldId, productType}}
            testnetwork.connector.sendCrop(fieldSelected.getFieldId(), fieldSelected.getPlantType());

        } else {
            /*
             DO NOTHING
             */
        }
    },
    onDragSeed: function(seedType, x, y) {
        //
        var fieldSelected = MapCtrl.instance.getField(x, y);

        var status = fieldSelected.checkStatus();

        if (status == FieldStatusTypes.EMPTY){
            //
            //fieldSelected.plant(seedType);
            if (fieldSelected.plant(seedType)){     //plant and if success
                //send msg to server {packet{fieldId, productType}}
                testnetwork.connector.sendPlant(fieldSelected.getFieldId(), fieldSelected.getPlantType());

                //animation
                MapLayer.instance.runAnimationPlantting(4, "caroot", 2);
            }

            ////send msg to server {packet{fieldId, productType}}
            //testnetwork.connector.sendPlant(fieldSelected.getFieldId(), fieldSelected.getPlantType());
            /*
             DONE
             */

        } else {
            /*
             DO NOTHING
             */
        }
    }
});
PlantCtrl.instance = new PlantCtrl();