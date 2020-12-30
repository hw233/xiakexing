module rf {

    export class XBancher extends SuperBatchRenderer {


        render(camera: Camera, option: IRenderOption) {

            /*
                step1:
                    收集variable相同的对象
                step2:
                    绘制
            */

            let { changeStatus: change, target, renderData, worldTransform, invSceneTransfrom } = this;

            let { scrollRect, sceneTransform } = target;

            if (change & DChange.vertex) {


                this.cleanBatch();
                //step1 收集所有可合并对象
                this.filterGeo(target);
                //     //step2 合并模型 和 vc信息
                this.toBatch();

                renderData = this.renderData;

                this.changeStatus &= ~DChange.batch;
            }




            var parentRect: Size;
            if (scrollRect) {
                parentRect = context3D.setScissor(scrollRect, sceneTransform[12], sceneTransform[13], camera);
            }

            worldTransform.m3_append(camera.worldTranform, false, sceneTransform);

            for (; renderData; renderData = renderData.__render_next) {
                if (renderData instanceof Sprite) {
                    renderData.render(camera, option);
                } else {
                    this.dc(renderData, worldTransform);
                }
            }


            if (scrollRect) {
                context3D.lossScissor(parentRect);
            }




        }

        dc(renderData: IBatchRenderData, worldTransform: IMatrix3D): void {
            let c = context3D;

            if (!this.length) {
                return;
            }

            let { program, vcData, offset, triangles, quad } = renderData;

            if (!program) {
                renderData.program = program = singleton(Shader).createProgram(renderData);
            }

            let { target } = this;
            let { filters } = target;

            let setting = c.setting;
            setting.depth = this.depth;
            setting.depthMode = this.depthMode;
            setting.src = this.srcFactor;
            setting.dst = this.dstFactor;
            setting.cull = this.cull;

            c.setProgram(program);
            let { vertexBuffer: vertex, sources } = this;
            vertex.uploadContext(program);
            let variable = "diff";
            for (let i = 0; i < sources.length; i++) {
                sources[i].uploadContext(program, i == 0 ? variable : variable + i);
            }

            for (let key in filters) {
                let filter = filters[key];
                if (filter && !filter.disable) {
                    filter.setProgramConstants(c, program, target);
                }
            }


            c.setProgramConstantsFromVector("ui", vcData, 4);
            c.setProgramConstantsFromMatrix("mvp", worldTransform);

            let indexbuffer = c.getIndexByQuad(quad);
            c.drawTriangles(indexbuffer, triangles, undefined, offset);
            // gl.RGBA4
        }
    }
}