import { AddCircle, Delete, DeleteForeverSharp } from '@mui/icons-material';
import AddIcon from "@mui/icons-material/Add";
import { IconButton } from '@mui/material';
import { fabric } from 'fabric';
import { useEffect, useRef, useState } from 'react';
import rotateIcon from "../../../../assets/icons/rotate.svg";
import deleteIcon from "../../../../assets/icons/deleteIcon.svg";
import { useDispatch, useSelector } from 'react-redux';
import { deleteImages, uploadeImages, uploadImage } from '../../../../store/item/item.slice';
import { useNavigate, useParams } from 'react-router-dom';
import PrimaryButton from '../../../../components/Buttons/PrimaryButton';
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";


const bgSrc = "/switter.png"
const SimpleCanvas = () => {
    const {id} = useParams()
    const navigate = useNavigate()
    const canvasRef = useRef(null);
    const [canvas, setCanvas] = useState(null);
    const [uploadedImages, setUploadedImages] = useState([]);
    const [rotateIconImage, setRotateIconImage] = useState(null);
    const [deleteIconImage, setDeleteIconImage] = useState(null);
    const {item} = useSelector((store) => store?.item)
    const dispatch = useDispatch()

    useEffect(() => {
        setUploadedImages(item.uploadedImages)
    },[dispatch])


   console.log("item==>",item);

console.log(item);
    useEffect(() => {
        const rotate = new Image();
        rotate.src = rotateIcon;
        rotate.onload = () => {
            setRotateIconImage(rotate);
        };

        const deleteIcn = new Image();
        deleteIcn.src = deleteIcon;
        deleteIcn.onload = () => {
            setDeleteIconImage(deleteIcn);
        };
    }, []);


    console.log(uploadedImages);
    useEffect(() => {
        const canvas = new fabric.Canvas(canvasRef.current, {
            width: canvasRef.current.parentNode.offsetWidth,
            height: 400,
        });

        if (bgSrc) {
            loadAndCenterBackgroundImage(canvas, bgSrc);
        }

        setCanvas(canvas);

        const handleResize = () => {
            const newWidth = canvasRef.current.parentNode.offsetWidth;
            canvas.setDimensions({ width: newWidth, height: 400 });
            canvas.renderAll();
        };

        window.addEventListener('resize', handleResize);

        canvas.on('object:moving', function (e) {
            var obj = e.target;
            var objLeft = obj.left,
                objTop = obj.top,
                objWidth = obj.getScaledWidth(),
                objHeight = obj.getScaledHeight(),
                canvasWidth = canvas.getWidth(),
                canvasHeight = canvas.getHeight();

            if (
                objLeft < 0 ||
                objTop < 0 ||
                objLeft + objWidth > canvasWidth ||
                objTop + objHeight > canvasHeight
            ) {
                obj.set({
                    left: Math.min(Math.max(objLeft, 0), canvasWidth - objWidth),
                    top: Math.min(Math.max(objTop, 0), canvasHeight - objHeight),
                });
            }
        });

        return () => {
            window.removeEventListener('resize', handleResize);
            canvas.dispose();
        };
    }, [bgSrc]);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.code === 'Delete' || e.key === 'Backspace') {
                deleteObject();
            }
        };

        if (canvas) {
            document.body.addEventListener('keydown', handleKeyDown);
        }

        return () => {
            document.body.removeEventListener('keydown', handleKeyDown);
        };
    }, [canvas]);

    const loadAndCenterBackgroundImage = (canvasInstance, src) => {
        fabric.Image.fromURL(src, (img) => {
            const canvasAspect = canvasInstance.width / canvasInstance.height;
            const imgAspect = img.width / img.height;
            let scaleFactor;

            if (canvasAspect >= imgAspect) {
                scaleFactor = canvasInstance.height / img.height;
            } else {
                scaleFactor = canvasInstance.width / img.width;
            }

            img.set({
                scaleX: scaleFactor,
                scaleY: scaleFactor,
                originX: 'center',
                originY: 'center',
                left: canvasInstance.width / 2,
                top: canvasInstance.height / 2,
            });

            canvasInstance.setBackgroundImage(img, canvasInstance.renderAll.bind(canvasInstance));
        });
    };

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (f) => {
                const data = f.target.result;
                setUploadedImages((prev) => [...prev, data]);
                dispatch(uploadeImages(data))
            };
            reader.readAsDataURL(file);
            e.target.value = null;
        }
    };

    const deleteObject = () => {
        const activeObject = canvas.getActiveObject();
        if (activeObject) {
            canvas.remove(activeObject);
        }
    };

    const addImageToObject = (imageSrc) => {
        if (canvas && imageSrc) {
            fabric.Image.fromURL(imageSrc, (img) => {
                img.scaleToWidth(canvas.width / 2);
                img.scaleToHeight(canvas.height / 2);
                img.set({
                    left: canvas.width / 4,
                    top: canvas.height / 4,
                    originX: 'left',
                    originY: 'top',
                });
                canvas.add(img);
                applyCustomControls(img);
                canvas.renderAll();
            });
        }
    };

    const deleteImage = (index) => {
        setUploadedImages(uploadedImages.filter((_, i) => i !== index));
        dispatch(deleteImages(index))
    };

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (canvas) {
                const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
                const isCopy = (e.ctrlKey || (isMac && e.metaKey)) && e.key === 'c';
                const isPaste = (e.ctrlKey || (isMac && e.metaKey)) && e.key === 'v';

                if (isCopy) {
                    e.preventDefault();
                    copyObject();
                } else if (isPaste) {
                    e.preventDefault();
                    pasteObject();
                } else if (e.key === 'Delete' || e.key === 'Backspace') {
                    e.preventDefault();
                    deleteObject();
                }
            }
        };

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [canvas]);

    const copyObject = () => {
        canvas.getActiveObject().clone(function (cloned) {
            _clipboard = cloned;
        });
    };

    const pasteObject = () => {
        _clipboard.clone(function (clonedObj) {
            canvas.discardActiveObject();
            clonedObj.set({
                left: clonedObj.left + 10,
                top: clonedObj.top + 10,
                evented: true,
            });
            if (clonedObj.type === 'activeSelection') {
                clonedObj.canvas = canvas;
                clonedObj.forEachObject(function (obj) {
                    canvas.add(obj);
                });
                clonedObj.setCoords();
            } else {
                canvas.add(clonedObj);
            }
            _clipboard.top += 10;
            _clipboard.left += 10;
            canvas.setActiveObject(clonedObj);
            canvas.requestRenderAll();
        });
    };

    let _clipboard = null;

    function renderCustomRotateControl(ctx, left, top, styleOverride, fabricObject) {
        const size = 32;
        ctx.save();
        ctx.translate(left, top);
        ctx.rotate(fabric.util.degreesToRadians(fabricObject.angle));
        ctx.drawImage(rotateIconImage, -size / 2, -size / 2, size, size);
        ctx.restore();
    }

    function renderCustomResizeControl(ctx, left, top, fabricObject) {
        const size = 20;
        ctx.save();
        ctx.translate(left, top);
        ctx.rotate(fabric.util.degreesToRadians(fabricObject.angle));
        ctx.fillStyle = 'black';
        ctx.beginPath();
        ctx.arc(0, 0, size / 2, 0, 2 * Math.PI);
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 2;
        ctx.fill();
        ctx.stroke();
        ctx.restore();
    }
    function renderCustomDeleteControl(ctx, left, top, fabricObject) {
        const size = 32;
        ctx.save();
        ctx.translate(left, top);
        ctx.rotate(fabric.util.degreesToRadians(fabricObject.angle));
        ctx.drawImage(deleteIconImage, -size / 2, -size / 2, size, size);
        ctx.restore();
    }

    const applyCustomControls = (obj) => {

        obj.controls = {
            ...fabric.Object.prototype.controls,
            tl: new fabric.Control({
                x: -0.5,
                y: -0.5,
                actionHandler: fabric.controlsUtils.scalingEqually,
                cursorStyle: 'nw-resize',
                render: renderCustomResizeControl,
                cornerSize: 16,
            }),
            tr: new fabric.Control({
                x: 0.5,
                y: -0.5,
                mouseUpHandler: function () {
                    deleteObject(obj);
                },
                render: renderCustomDeleteControl,
                cursorStyle: 'pointer',
                cornerSize: 16,

            }),
            bl: new fabric.Control({
                x: -0.5,
                y: 0.5,
                actionHandler: fabric.controlsUtils.scalingEqually,
                cursorStyle: 'sw-resize',
                render: renderCustomResizeControl,
                cornerSize: 16,
            }),
            br: new fabric.Control({
                x: 0.5,
                y: 0.5,
                actionHandler: fabric.controlsUtils.scalingEqually,
                cursorStyle: 'se-resize',
                render: renderCustomResizeControl,
                cornerSize: 16,
            }),

            mt: new fabric.Control({
                x: 0,
                y: -0.5,
                actionHandler: fabric.controlsUtils.scalingY,
                actionName: 'n-resize',
                cursorStyle: 'n-resize',
                render: renderCustomResizeControl,
                cornerSize: 16
            }),

            mb: new fabric.Control({
                x: 0,
                y: 0.5,
                actionHandler: fabric.controlsUtils.scalingY,
                actionName: 's-resize',
                cursorStyle: 's-resize',
                render: renderCustomResizeControl,
                cornerSize: 16
            }),

            ml: new fabric.Control({
                x: -0.5,
                y: 0,
                actionHandler: fabric.controlsUtils.scalingX,
                actionName: 'w-resize',
                cursorStyle: 'w-resize',
                render: renderCustomResizeControl,
                cornerSize: 16
            }),

            mr: new fabric.Control({
                x: 0.5,
                y: 0,
                actionHandler: fabric.controlsUtils.scalingX,
                actionName: 'e-resize',
                cursorStyle: 'e-resize',
                render: renderCustomResizeControl,
                cornerSize: 16
            }),

            mtr: new fabric.Control({
                x: 0,
                y: -0.5,
                offsetY: -30,
                actionHandler: fabric.controlsUtils.rotationWithSnapping,
                actionName: 'rotate',
                cursorStyle: 'rotate',
                render: renderCustomRotateControl,
                cornerSize: 16
            }),
        };
        obj.setControlsVisibility({
            mt: true,
            mb: true,
            ml: true,
            mr: true,
            bl: true,
            br: true,
            tl: true,
            tr: true,
            mtr: true,
        });
    };


     // Function to get image URL from canvas
     const getImageFromCanvas = () => {
        if (canvas) {
            const dataURL = canvas.toDataURL({
                format: 'png',
                quality: 0.8 // Adjust the quality if needed
            });
            dispatch(uploadImage(dataURL))
            navigate(`/products/${id}/preview`)
            // setImageUrl(dataURL);
        }
    };

    return (
        <>

        <div className="flex flex-col items-start gap-4 px-4 pb-[60px] overflow-x-hidden">
            {/* <IconButton aria-label="delete" onClick={deleteObject} style={{ margin: '10px', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}>
                <Delete sx={{ color: 'red' }} />
            </IconButton> */}

            <div className='w-full'>
                <canvas ref={canvasRef} style={{ width: '100%' }}></canvas>
            </div>
            <div className="w-full">
                <ul>
                    {uploadedImages.map((imageSrc, index) => (
                        <li key={index} className='flex gap-2 flex-col bg-[#F7F7F8] items-start p-4 mb-2 border rounded-lg '>
                            <div className="font-semibold">
                                Logo: {index + 1}
                            </div>
                            <div className='w-full flex justify-between gap-4'>
                            <div className='rounded-lg overflow-hidden  h-[100px]'>
                                <img className='w-[100px] h-[100px] object-cover' src={imageSrc} alt={`Uploaded ${index}`} />
                            </div>
                            <div className='flex items-start gap-4'>
                                <button className="text-lg px-4 py-2 border-2 rounded-xl border-[#DEE0E3]" onClick={() => deleteImage(index)} >
                                    Remove
                                </button>
                                <button className="text-lg px-4 py-2 border-2 rounded-xl border-[#DEE0E3]" onClick={() => addImageToObject(imageSrc)} >
                                    Add
                                </button>
                            </div>
                            </div>
                        </li>
                    ))}
                </ul>
                <label htmlFor='file' className="mt-4 text-center block w-full py-2 px-6 rounded-lg bg-[#afafaf] text-white font-semibold"> 
                    <AddIcon color="inherit" /> Add image
                    <input className='hidden' id='file' type="file" accept="image/*" onChange={handleFileUpload} />
                </label>
            </div>
        </div >
                <div className="fixed bottom-0 right-0 left-0 px-[20px]">
          <PrimaryButton center onClick={getImageFromCanvas}>
            Go to Payment
            <ArrowForwardIcon />
          </PrimaryButton>
        </div>
        </>
    );
};

export default SimpleCanvas;
