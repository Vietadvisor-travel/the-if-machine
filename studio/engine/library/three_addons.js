/* three.js r160 addons (MIT) bundled for the global THREE: loaders, post-processing, Sky, Water, SkeletonUtils. Built by tools/three_addons (esbuild). */
(()=>{var $n=Object.create;var Rr=Object.defineProperty;var ei=Object.getOwnPropertyDescriptor;var ti=Object.getOwnPropertyNames;var ri=Object.getPrototypeOf,ni=Object.prototype.hasOwnProperty;var ii=(a,e)=>()=>(e||a((e={exports:{}}).exports,e),e.exports),mn=(a,e)=>{for(var t in e)Rr(a,t,{get:e[t],enumerable:!0})},si=(a,e,t,n)=>{if(e&&typeof e=="object"||typeof e=="function")for(let r of ti(e))!ni.call(a,r)&&r!==t&&Rr(a,r,{get:()=>e[r],enumerable:!(n=ei(e,r))||n.enumerable});return a};var Ae=(a,e,t)=>(t=a!=null?$n(ri(a)):{},si(e||!a||!a.__esModule?Rr(t,"default",{value:a,enumerable:!0}):t,a));var ge=ii((qi,vn)=>{vn.exports=window.THREE});var v=Ae(ge(),1);var Pr={};mn(Pr,{computeMikkTSpaceTangents:()=>oi,computeMorphedAttributes:()=>hi,deepCloneAttribute:()=>ai,deinterleaveAttribute:()=>ur,deinterleaveGeometry:()=>ci,estimateBytesUsed:()=>ui,interleaveAttributes:()=>li,mergeAttributes:()=>cr,mergeBufferAttributes:()=>vi,mergeBufferGeometries:()=>mi,mergeGeometries:()=>gn,mergeGroups:()=>di,mergeVertices:()=>fi,toCreasedNormals:()=>pi,toTrianglesDrawMode:()=>fr});var $=Ae(ge(),1);function oi(a,e,t=!0){if(!e||!e.isReady)throw new Error("BufferGeometryUtils: Initialized MikkTSpace library required.");if(!a.hasAttribute("position")||!a.hasAttribute("normal")||!a.hasAttribute("uv"))throw new Error('BufferGeometryUtils: Tangents require "position", "normal", and "uv" attributes.');function n(i){if(i.normalized||i.isInterleavedBufferAttribute){let c=new Float32Array(i.count*i.itemSize);for(let l=0,f=0;l<i.count;l++)c[f++]=i.getX(l),c[f++]=i.getY(l),i.itemSize>2&&(c[f++]=i.getZ(l));return c}return i.array instanceof Float32Array?i.array:new Float32Array(i.array)}let r=a.index?a.toNonIndexed():a,s=e.generateTangents(n(r.attributes.position),n(r.attributes.normal),n(r.attributes.uv));if(t)for(let i=3;i<s.length;i+=4)s[i]*=-1;return r.setAttribute("tangent",new $.BufferAttribute(s,4)),a!==r&&a.copy(r),a}function gn(a,e=!1){let t=a[0].index!==null,n=new Set(Object.keys(a[0].attributes)),r=new Set(Object.keys(a[0].morphAttributes)),s={},i={},c=a[0].morphTargetsRelative,l=new $.BufferGeometry,f=0;for(let d=0;d<a.length;++d){let h=a[d],m=0;if(t!==(h.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+d+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(let g in h.attributes){if(!n.has(g))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+d+'. All geometries must have compatible attributes; make sure "'+g+'" attribute exists among all geometries, or in none of them.'),null;s[g]===void 0&&(s[g]=[]),s[g].push(h.attributes[g]),m++}if(m!==n.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+d+". Make sure all geometries have the same number of attributes."),null;if(c!==h.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+d+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(let g in h.morphAttributes){if(!r.has(g))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+d+".  .morphAttributes must be consistent throughout all geometries."),null;i[g]===void 0&&(i[g]=[]),i[g].push(h.morphAttributes[g])}if(e){let g;if(t)g=h.index.count;else if(h.attributes.position!==void 0)g=h.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+d+". The geometry must have either an index or a position attribute"),null;l.addGroup(f,g,d),f+=g}}if(t){let d=0,h=[];for(let m=0;m<a.length;++m){let g=a[m].index;for(let y=0;y<g.count;++y)h.push(g.getX(y)+d);d+=a[m].attributes.position.count}l.setIndex(h)}for(let d in s){let h=cr(s[d]);if(!h)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+d+" attribute."),null;l.setAttribute(d,h)}for(let d in i){let h=i[d][0].length;if(h===0)break;l.morphAttributes=l.morphAttributes||{},l.morphAttributes[d]=[];for(let m=0;m<h;++m){let g=[];for(let M=0;M<i[d].length;++M)g.push(i[d][M][m]);let y=cr(g);if(!y)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+d+" morphAttribute."),null;l.morphAttributes[d].push(y)}}return l}function cr(a){let e,t,n,r=-1,s=0;for(let f=0;f<a.length;++f){let d=a[f];if(d.isInterleavedBufferAttribute)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. InterleavedBufferAttributes are not supported."),null;if(e===void 0&&(e=d.array.constructor),e!==d.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(t===void 0&&(t=d.itemSize),t!==d.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(n===void 0&&(n=d.normalized),n!==d.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(r===-1&&(r=d.gpuType),r!==d.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;s+=d.array.length}let i=new e(s),c=0;for(let f=0;f<a.length;++f)i.set(a[f].array,c),c+=a[f].array.length;let l=new $.BufferAttribute(i,t,n);return r!==void 0&&(l.gpuType=r),l}function ai(a){return a.isInstancedInterleavedBufferAttribute||a.isInterleavedBufferAttribute?ur(a):a.isInstancedBufferAttribute?new $.InstancedBufferAttribute().copy(a):new $.BufferAttribute().copy(a)}function li(a){let e,t=0,n=0;for(let f=0,d=a.length;f<d;++f){let h=a[f];if(e===void 0&&(e=h.array.constructor),e!==h.array.constructor)return console.error("AttributeBuffers of different types cannot be interleaved"),null;t+=h.array.length,n+=h.itemSize}let r=new $.InterleavedBuffer(new e(t),n),s=0,i=[],c=["getX","getY","getZ","getW"],l=["setX","setY","setZ","setW"];for(let f=0,d=a.length;f<d;f++){let h=a[f],m=h.itemSize,g=h.count,y=new $.InterleavedBufferAttribute(r,m,s,h.normalized);i.push(y),s+=m;for(let M=0;M<g;M++)for(let A=0;A<m;A++)y[l[A]](M,h[c[A]](M))}return i}function ur(a){let e=a.data.array.constructor,t=a.count,n=a.itemSize,r=a.normalized,s=new e(t*n),i;a.isInstancedInterleavedBufferAttribute?i=new $.InstancedBufferAttribute(s,n,r,a.meshPerAttribute):i=new $.BufferAttribute(s,n,r);for(let c=0;c<t;c++)i.setX(c,a.getX(c)),n>=2&&i.setY(c,a.getY(c)),n>=3&&i.setZ(c,a.getZ(c)),n>=4&&i.setW(c,a.getW(c));return i}function ci(a){let e=a.attributes,t=a.morphTargets,n=new Map;for(let r in e){let s=e[r];s.isInterleavedBufferAttribute&&(n.has(s)||n.set(s,ur(s)),e[r]=n.get(s))}for(let r in t){let s=t[r];s.isInterleavedBufferAttribute&&(n.has(s)||n.set(s,ur(s)),t[r]=n.get(s))}}function ui(a){let e=0;for(let n in a.attributes){let r=a.getAttribute(n);e+=r.count*r.itemSize*r.array.BYTES_PER_ELEMENT}let t=a.getIndex();return e+=t?t.count*t.itemSize*t.array.BYTES_PER_ELEMENT:0,e}function fi(a,e=1e-4){e=Math.max(e,Number.EPSILON);let t={},n=a.getIndex(),r=a.getAttribute("position"),s=n?n.count:r.count,i=0,c=Object.keys(a.attributes),l={},f={},d=[],h=["getX","getY","getZ","getW"],m=["setX","setY","setZ","setW"];for(let E=0,N=c.length;E<N;E++){let D=c[E],L=a.attributes[D];l[D]=new $.BufferAttribute(new L.array.constructor(L.count*L.itemSize),L.itemSize,L.normalized);let j=a.morphAttributes[D];j&&(f[D]=new $.BufferAttribute(new j.array.constructor(j.count*j.itemSize),j.itemSize,j.normalized))}let g=e*.5,y=Math.log10(1/e),M=Math.pow(10,y),A=g*M;for(let E=0;E<s;E++){let N=n?n.getX(E):E,D="";for(let L=0,j=c.length;L<j;L++){let F=c[L],S=a.getAttribute(F),R=S.itemSize;for(let U=0;U<R;U++)D+=`${~~(S[h[U]](N)*M+A)},`}if(D in t)d.push(t[D]);else{for(let L=0,j=c.length;L<j;L++){let F=c[L],S=a.getAttribute(F),R=a.morphAttributes[F],U=S.itemSize,H=l[F],B=f[F];for(let _=0;_<U;_++){let G=h[_],q=m[_];if(H[q](i,S[G](N)),R)for(let V=0,Se=R.length;V<Se;V++)B[V][q](i,R[V][G](N))}}t[D]=i,d.push(i),i++}}let b=a.clone();for(let E in a.attributes){let N=l[E];if(b.setAttribute(E,new $.BufferAttribute(N.array.slice(0,i*N.itemSize),N.itemSize,N.normalized)),E in f)for(let D=0;D<f[E].length;D++){let L=f[E][D];b.morphAttributes[E][D]=new $.BufferAttribute(L.array.slice(0,i*L.itemSize),L.itemSize,L.normalized)}}return b.setIndex(d),b}function fr(a,e){if(e===$.TrianglesDrawMode)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),a;if(e===$.TriangleFanDrawMode||e===$.TriangleStripDrawMode){let t=a.getIndex();if(t===null){let i=[],c=a.getAttribute("position");if(c!==void 0){for(let l=0;l<c.count;l++)i.push(l);a.setIndex(i),t=a.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),a}let n=t.count-2,r=[];if(e===$.TriangleFanDrawMode)for(let i=1;i<=n;i++)r.push(t.getX(0)),r.push(t.getX(i)),r.push(t.getX(i+1));else for(let i=0;i<n;i++)i%2===0?(r.push(t.getX(i)),r.push(t.getX(i+1)),r.push(t.getX(i+2))):(r.push(t.getX(i+2)),r.push(t.getX(i+1)),r.push(t.getX(i)));r.length/3!==n&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");let s=a.clone();return s.setIndex(r),s.clearGroups(),s}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),a}function hi(a){let e=new $.Vector3,t=new $.Vector3,n=new $.Vector3,r=new $.Vector3,s=new $.Vector3,i=new $.Vector3,c=new $.Vector3,l=new $.Vector3,f=new $.Vector3;function d(ee,ie,ye,ae,fe,be,ke,te){e.fromBufferAttribute(ie,fe),t.fromBufferAttribute(ie,be),n.fromBufferAttribute(ie,ke);let Re=ee.morphTargetInfluences;if(ye&&Re){c.set(0,0,0),l.set(0,0,0),f.set(0,0,0);for(let Te=0,_e=ye.length;Te<_e;Te++){let Be=Re[Te],rt=ye[Te];Be!==0&&(r.fromBufferAttribute(rt,fe),s.fromBufferAttribute(rt,be),i.fromBufferAttribute(rt,ke),ae?(c.addScaledVector(r,Be),l.addScaledVector(s,Be),f.addScaledVector(i,Be)):(c.addScaledVector(r.sub(e),Be),l.addScaledVector(s.sub(t),Be),f.addScaledVector(i.sub(n),Be)))}e.add(c),t.add(l),n.add(f)}ee.isSkinnedMesh&&(ee.applyBoneTransform(fe,e),ee.applyBoneTransform(be,t),ee.applyBoneTransform(ke,n)),te[fe*3+0]=e.x,te[fe*3+1]=e.y,te[fe*3+2]=e.z,te[be*3+0]=t.x,te[be*3+1]=t.y,te[be*3+2]=t.z,te[ke*3+0]=n.x,te[ke*3+1]=n.y,te[ke*3+2]=n.z}let h=a.geometry,m=a.material,g,y,M,A=h.index,b=h.attributes.position,E=h.morphAttributes.position,N=h.morphTargetsRelative,D=h.attributes.normal,L=h.morphAttributes.position,j=h.groups,F=h.drawRange,S,R,U,H,B,_,G,q=new Float32Array(b.count*b.itemSize),V=new Float32Array(D.count*D.itemSize);if(A!==null)if(Array.isArray(m))for(S=0,U=j.length;S<U;S++)for(B=j[S],_=Math.max(B.start,F.start),G=Math.min(B.start+B.count,F.start+F.count),R=_,H=G;R<H;R+=3)g=A.getX(R),y=A.getX(R+1),M=A.getX(R+2),d(a,b,E,N,g,y,M,q),d(a,D,L,N,g,y,M,V);else for(_=Math.max(0,F.start),G=Math.min(A.count,F.start+F.count),S=_,U=G;S<U;S+=3)g=A.getX(S),y=A.getX(S+1),M=A.getX(S+2),d(a,b,E,N,g,y,M,q),d(a,D,L,N,g,y,M,V);else if(Array.isArray(m))for(S=0,U=j.length;S<U;S++)for(B=j[S],_=Math.max(B.start,F.start),G=Math.min(B.start+B.count,F.start+F.count),R=_,H=G;R<H;R+=3)g=R,y=R+1,M=R+2,d(a,b,E,N,g,y,M,q),d(a,D,L,N,g,y,M,V);else for(_=Math.max(0,F.start),G=Math.min(b.count,F.start+F.count),S=_,U=G;S<U;S+=3)g=S,y=S+1,M=S+2,d(a,b,E,N,g,y,M,q),d(a,D,L,N,g,y,M,V);let Se=new $.Float32BufferAttribute(q,3),Me=new $.Float32BufferAttribute(V,3);return{positionAttribute:b,normalAttribute:D,morphedPositionAttribute:Se,morphedNormalAttribute:Me}}function di(a){if(a.groups.length===0)return console.warn("THREE.BufferGeometryUtils.mergeGroups(): No groups are defined. Nothing to merge."),a;let e=a.groups;if(e=e.sort((i,c)=>i.materialIndex!==c.materialIndex?i.materialIndex-c.materialIndex:i.start-c.start),a.getIndex()===null){let i=a.getAttribute("position"),c=[];for(let l=0;l<i.count;l+=3)c.push(l,l+1,l+2);a.setIndex(c)}let t=a.getIndex(),n=[];for(let i=0;i<e.length;i++){let c=e[i],l=c.start,f=l+c.count;for(let d=l;d<f;d++)n.push(t.getX(d))}a.dispose(),a.setIndex(n);let r=0;for(let i=0;i<e.length;i++){let c=e[i];c.start=r,r+=c.count}let s=e[0];a.groups=[s];for(let i=1;i<e.length;i++){let c=e[i];s.materialIndex===c.materialIndex?s.count+=c.count:(s=c,a.groups.push(s))}return a}function pi(a,e=Math.PI/3){let t=Math.cos(e),n=(1+1e-10)*100,r=[new $.Vector3,new $.Vector3,new $.Vector3],s=new $.Vector3,i=new $.Vector3,c=new $.Vector3,l=new $.Vector3;function f(M){let A=~~(M.x*n),b=~~(M.y*n),E=~~(M.z*n);return`${A},${b},${E}`}let d=a.index?a.toNonIndexed():a,h=d.attributes.position,m={};for(let M=0,A=h.count/3;M<A;M++){let b=3*M,E=r[0].fromBufferAttribute(h,b+0),N=r[1].fromBufferAttribute(h,b+1),D=r[2].fromBufferAttribute(h,b+2);s.subVectors(D,N),i.subVectors(E,N);let L=new $.Vector3().crossVectors(s,i).normalize();for(let j=0;j<3;j++){let F=r[j],S=f(F);S in m||(m[S]=[]),m[S].push(L)}}let g=new Float32Array(h.count*3),y=new $.BufferAttribute(g,3,!1);for(let M=0,A=h.count/3;M<A;M++){let b=3*M,E=r[0].fromBufferAttribute(h,b+0),N=r[1].fromBufferAttribute(h,b+1),D=r[2].fromBufferAttribute(h,b+2);s.subVectors(D,N),i.subVectors(E,N),c.crossVectors(s,i).normalize();for(let L=0;L<3;L++){let j=r[L],F=f(j),S=m[F];l.set(0,0,0);for(let R=0,U=S.length;R<U;R++){let H=S[R];c.dot(H)>t&&l.add(H)}l.normalize(),y.setXYZ(b+L,l.x,l.y,l.z)}}return d.setAttribute("normal",y),d}function mi(a,e=!1){return console.warn("THREE.BufferGeometryUtils: mergeBufferGeometries() has been renamed to mergeGeometries()."),gn(a,e)}function vi(a){return console.warn("THREE.BufferGeometryUtils: mergeBufferAttributes() has been renamed to mergeAttributes()."),cr(a)}var hr=class extends v.Loader{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new zr(t)}),this.register(function(t){return new _r(t)}),this.register(function(t){return new Zr(t)}),this.register(function(t){return new Kr(t)}),this.register(function(t){return new Hr(t)}),this.register(function(t){return new kr(t)}),this.register(function(t){return new Gr(t)}),this.register(function(t){return new Vr(t)}),this.register(function(t){return new Br(t)}),this.register(function(t){return new Wr(t)}),this.register(function(t){return new Fr(t)}),this.register(function(t){return new Xr(t)}),this.register(function(t){return new jr(t)}),this.register(function(t){return new Ir(t)}),this.register(function(t){return new Yr(t)}),this.register(function(t){return new qr(t)})}load(e,t,n,r){let s=this,i;if(this.resourcePath!=="")i=this.resourcePath;else if(this.path!==""){let f=v.LoaderUtils.extractUrlBase(e);i=v.LoaderUtils.resolveURL(f,this.path)}else i=v.LoaderUtils.extractUrlBase(e);this.manager.itemStart(e);let c=function(f){r?r(f):console.error(f),s.manager.itemError(e),s.manager.itemEnd(e)},l=new v.FileLoader(this.manager);l.setPath(this.path),l.setResponseType("arraybuffer"),l.setRequestHeader(this.requestHeader),l.setWithCredentials(this.withCredentials),l.load(e,function(f){try{s.parse(f,i,function(d){t(d),s.manager.itemEnd(e)},c)}catch(d){c(d)}},n,c)}setDRACOLoader(e){return this.dracoLoader=e,this}setDDSLoader(){throw new Error('THREE.GLTFLoader: "MSFT_texture_dds" no longer supported. Please update to "KHR_texture_basisu".')}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,n,r){let s,i={},c={},l=new TextDecoder;if(typeof e=="string")s=JSON.parse(e);else if(e instanceof ArrayBuffer)if(l.decode(new Uint8Array(e,0,4))===Tn){try{i[le.KHR_BINARY_GLTF]=new Qr(e)}catch(h){r&&r(h);return}s=JSON.parse(i[le.KHR_BINARY_GLTF].content)}else s=JSON.parse(l.decode(e));else s=e;if(s.asset===void 0||s.asset.version[0]<2){r&&r(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}let f=new sn(s,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});f.fileLoader.setRequestHeader(this.requestHeader);for(let d=0;d<this.pluginCallbacks.length;d++){let h=this.pluginCallbacks[d](f);h.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),c[h.name]=h,i[h.name]=!0}if(s.extensionsUsed)for(let d=0;d<s.extensionsUsed.length;++d){let h=s.extensionsUsed[d],m=s.extensionsRequired||[];switch(h){case le.KHR_MATERIALS_UNLIT:i[h]=new Or;break;case le.KHR_DRACO_MESH_COMPRESSION:i[h]=new Jr(s,this.dracoLoader);break;case le.KHR_TEXTURE_TRANSFORM:i[h]=new $r;break;case le.KHR_MESH_QUANTIZATION:i[h]=new en;break;default:m.indexOf(h)>=0&&c[h]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+h+'".')}}f.setExtensions(i),f.setPlugins(c),f.parse(n,r)}parseAsync(e,t){let n=this;return new Promise(function(r,s){n.parse(e,t,r,s)})}};function gi(){let a={};return{get:function(e){return a[e]},add:function(e,t){a[e]=t},remove:function(e){delete a[e]},removeAll:function(){a={}}}}var le={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"},Ir=class{constructor(e){this.parser=e,this.name=le.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){let e=this.parser,t=this.parser.json.nodes||[];for(let n=0,r=t.length;n<r;n++){let s=t[n];s.extensions&&s.extensions[this.name]&&s.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,s.extensions[this.name].light)}}_loadLight(e){let t=this.parser,n="light:"+e,r=t.cache.get(n);if(r)return r;let s=t.json,l=((s.extensions&&s.extensions[this.name]||{}).lights||[])[e],f,d=new v.Color(16777215);l.color!==void 0&&d.setRGB(l.color[0],l.color[1],l.color[2],v.LinearSRGBColorSpace);let h=l.range!==void 0?l.range:0;switch(l.type){case"directional":f=new v.DirectionalLight(d),f.target.position.set(0,0,-1),f.add(f.target);break;case"point":f=new v.PointLight(d),f.distance=h;break;case"spot":f=new v.SpotLight(d),f.distance=h,l.spot=l.spot||{},l.spot.innerConeAngle=l.spot.innerConeAngle!==void 0?l.spot.innerConeAngle:0,l.spot.outerConeAngle=l.spot.outerConeAngle!==void 0?l.spot.outerConeAngle:Math.PI/4,f.angle=l.spot.outerConeAngle,f.penumbra=1-l.spot.innerConeAngle/l.spot.outerConeAngle,f.target.position.set(0,0,-1),f.add(f.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+l.type)}return f.position.set(0,0,0),f.decay=2,ut(f,l),l.intensity!==void 0&&(f.intensity=l.intensity),f.name=t.createUniqueName(l.name||"light_"+e),r=Promise.resolve(f),t.cache.add(n,r),r}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){let t=this,n=this.parser,s=n.json.nodes[e],c=(s.extensions&&s.extensions[this.name]||{}).light;return c===void 0?null:this._loadLight(c).then(function(l){return n._getNodeRef(t.cache,c,l)})}},Or=class{constructor(){this.name=le.KHR_MATERIALS_UNLIT}getMaterialType(){return v.MeshBasicMaterial}extendParams(e,t,n){let r=[];e.color=new v.Color(1,1,1),e.opacity=1;let s=t.pbrMetallicRoughness;if(s){if(Array.isArray(s.baseColorFactor)){let i=s.baseColorFactor;e.color.setRGB(i[0],i[1],i[2],v.LinearSRGBColorSpace),e.opacity=i[3]}s.baseColorTexture!==void 0&&r.push(n.assignTexture(e,"map",s.baseColorTexture,v.SRGBColorSpace))}return Promise.all(r)}},Br=class{constructor(e){this.parser=e,this.name=le.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){let r=this.parser.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();let s=r.extensions[this.name].emissiveStrength;return s!==void 0&&(t.emissiveIntensity=s),Promise.resolve()}},zr=class{constructor(e){this.parser=e,this.name=le.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:v.MeshPhysicalMaterial}extendMaterialParams(e,t){let n=this.parser,r=n.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();let s=[],i=r.extensions[this.name];if(i.clearcoatFactor!==void 0&&(t.clearcoat=i.clearcoatFactor),i.clearcoatTexture!==void 0&&s.push(n.assignTexture(t,"clearcoatMap",i.clearcoatTexture)),i.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=i.clearcoatRoughnessFactor),i.clearcoatRoughnessTexture!==void 0&&s.push(n.assignTexture(t,"clearcoatRoughnessMap",i.clearcoatRoughnessTexture)),i.clearcoatNormalTexture!==void 0&&(s.push(n.assignTexture(t,"clearcoatNormalMap",i.clearcoatNormalTexture)),i.clearcoatNormalTexture.scale!==void 0)){let c=i.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new v.Vector2(c,c)}return Promise.all(s)}},Fr=class{constructor(e){this.parser=e,this.name=le.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:v.MeshPhysicalMaterial}extendMaterialParams(e,t){let n=this.parser,r=n.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();let s=[],i=r.extensions[this.name];return i.iridescenceFactor!==void 0&&(t.iridescence=i.iridescenceFactor),i.iridescenceTexture!==void 0&&s.push(n.assignTexture(t,"iridescenceMap",i.iridescenceTexture)),i.iridescenceIor!==void 0&&(t.iridescenceIOR=i.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),i.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=i.iridescenceThicknessMinimum),i.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=i.iridescenceThicknessMaximum),i.iridescenceThicknessTexture!==void 0&&s.push(n.assignTexture(t,"iridescenceThicknessMap",i.iridescenceThicknessTexture)),Promise.all(s)}},Hr=class{constructor(e){this.parser=e,this.name=le.KHR_MATERIALS_SHEEN}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:v.MeshPhysicalMaterial}extendMaterialParams(e,t){let n=this.parser,r=n.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();let s=[];t.sheenColor=new v.Color(0,0,0),t.sheenRoughness=0,t.sheen=1;let i=r.extensions[this.name];if(i.sheenColorFactor!==void 0){let c=i.sheenColorFactor;t.sheenColor.setRGB(c[0],c[1],c[2],v.LinearSRGBColorSpace)}return i.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=i.sheenRoughnessFactor),i.sheenColorTexture!==void 0&&s.push(n.assignTexture(t,"sheenColorMap",i.sheenColorTexture,v.SRGBColorSpace)),i.sheenRoughnessTexture!==void 0&&s.push(n.assignTexture(t,"sheenRoughnessMap",i.sheenRoughnessTexture)),Promise.all(s)}},kr=class{constructor(e){this.parser=e,this.name=le.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:v.MeshPhysicalMaterial}extendMaterialParams(e,t){let n=this.parser,r=n.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();let s=[],i=r.extensions[this.name];return i.transmissionFactor!==void 0&&(t.transmission=i.transmissionFactor),i.transmissionTexture!==void 0&&s.push(n.assignTexture(t,"transmissionMap",i.transmissionTexture)),Promise.all(s)}},Gr=class{constructor(e){this.parser=e,this.name=le.KHR_MATERIALS_VOLUME}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:v.MeshPhysicalMaterial}extendMaterialParams(e,t){let n=this.parser,r=n.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();let s=[],i=r.extensions[this.name];t.thickness=i.thicknessFactor!==void 0?i.thicknessFactor:0,i.thicknessTexture!==void 0&&s.push(n.assignTexture(t,"thicknessMap",i.thicknessTexture)),t.attenuationDistance=i.attenuationDistance||1/0;let c=i.attenuationColor||[1,1,1];return t.attenuationColor=new v.Color().setRGB(c[0],c[1],c[2],v.LinearSRGBColorSpace),Promise.all(s)}},Vr=class{constructor(e){this.parser=e,this.name=le.KHR_MATERIALS_IOR}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:v.MeshPhysicalMaterial}extendMaterialParams(e,t){let r=this.parser.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();let s=r.extensions[this.name];return t.ior=s.ior!==void 0?s.ior:1.5,Promise.resolve()}},Wr=class{constructor(e){this.parser=e,this.name=le.KHR_MATERIALS_SPECULAR}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:v.MeshPhysicalMaterial}extendMaterialParams(e,t){let n=this.parser,r=n.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();let s=[],i=r.extensions[this.name];t.specularIntensity=i.specularFactor!==void 0?i.specularFactor:1,i.specularTexture!==void 0&&s.push(n.assignTexture(t,"specularIntensityMap",i.specularTexture));let c=i.specularColorFactor||[1,1,1];return t.specularColor=new v.Color().setRGB(c[0],c[1],c[2],v.LinearSRGBColorSpace),i.specularColorTexture!==void 0&&s.push(n.assignTexture(t,"specularColorMap",i.specularColorTexture,v.SRGBColorSpace)),Promise.all(s)}},jr=class{constructor(e){this.parser=e,this.name=le.EXT_MATERIALS_BUMP}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:v.MeshPhysicalMaterial}extendMaterialParams(e,t){let n=this.parser,r=n.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();let s=[],i=r.extensions[this.name];return t.bumpScale=i.bumpFactor!==void 0?i.bumpFactor:1,i.bumpTexture!==void 0&&s.push(n.assignTexture(t,"bumpMap",i.bumpTexture)),Promise.all(s)}},Xr=class{constructor(e){this.parser=e,this.name=le.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:v.MeshPhysicalMaterial}extendMaterialParams(e,t){let n=this.parser,r=n.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();let s=[],i=r.extensions[this.name];return i.anisotropyStrength!==void 0&&(t.anisotropy=i.anisotropyStrength),i.anisotropyRotation!==void 0&&(t.anisotropyRotation=i.anisotropyRotation),i.anisotropyTexture!==void 0&&s.push(n.assignTexture(t,"anisotropyMap",i.anisotropyTexture)),Promise.all(s)}},_r=class{constructor(e){this.parser=e,this.name=le.KHR_TEXTURE_BASISU}loadTexture(e){let t=this.parser,n=t.json,r=n.textures[e];if(!r.extensions||!r.extensions[this.name])return null;let s=r.extensions[this.name],i=t.options.ktx2Loader;if(!i){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,s.source,i)}},Zr=class{constructor(e){this.parser=e,this.name=le.EXT_TEXTURE_WEBP,this.isSupported=null}loadTexture(e){let t=this.name,n=this.parser,r=n.json,s=r.textures[e];if(!s.extensions||!s.extensions[t])return null;let i=s.extensions[t],c=r.images[i.source],l=n.textureLoader;if(c.uri){let f=n.options.manager.getHandler(c.uri);f!==null&&(l=f)}return this.detectSupport().then(function(f){if(f)return n.loadTextureImage(e,i.source,l);if(r.extensionsRequired&&r.extensionsRequired.indexOf(t)>=0)throw new Error("THREE.GLTFLoader: WebP required by asset but unsupported.");return n.loadTexture(e)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(e){let t=new Image;t.src="data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA",t.onload=t.onerror=function(){e(t.height===1)}})),this.isSupported}},Kr=class{constructor(e){this.parser=e,this.name=le.EXT_TEXTURE_AVIF,this.isSupported=null}loadTexture(e){let t=this.name,n=this.parser,r=n.json,s=r.textures[e];if(!s.extensions||!s.extensions[t])return null;let i=s.extensions[t],c=r.images[i.source],l=n.textureLoader;if(c.uri){let f=n.options.manager.getHandler(c.uri);f!==null&&(l=f)}return this.detectSupport().then(function(f){if(f)return n.loadTextureImage(e,i.source,l);if(r.extensionsRequired&&r.extensionsRequired.indexOf(t)>=0)throw new Error("THREE.GLTFLoader: AVIF required by asset but unsupported.");return n.loadTexture(e)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(e){let t=new Image;t.src="data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAABcAAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAEAAAABAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQAMAAAAABNjb2xybmNseAACAAIABoAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAAB9tZGF0EgAKCBgABogQEDQgMgkQAAAAB8dSLfI=",t.onload=t.onerror=function(){e(t.height===1)}})),this.isSupported}},Yr=class{constructor(e){this.name=le.EXT_MESHOPT_COMPRESSION,this.parser=e}loadBufferView(e){let t=this.parser.json,n=t.bufferViews[e];if(n.extensions&&n.extensions[this.name]){let r=n.extensions[this.name],s=this.parser.getDependency("buffer",r.buffer),i=this.parser.options.meshoptDecoder;if(!i||!i.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return s.then(function(c){let l=r.byteOffset||0,f=r.byteLength||0,d=r.count,h=r.byteStride,m=new Uint8Array(c,l,f);return i.decodeGltfBufferAsync?i.decodeGltfBufferAsync(d,h,m,r.mode,r.filter).then(function(g){return g.buffer}):i.ready.then(function(){let g=new ArrayBuffer(d*h);return i.decodeGltfBuffer(new Uint8Array(g),d,h,m,r.mode,r.filter),g})})}else return null}},qr=class{constructor(e){this.name=le.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){let t=this.parser.json,n=t.nodes[e];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;let r=t.meshes[n.mesh];for(let f of r.primitives)if(f.mode!==Ke.TRIANGLES&&f.mode!==Ke.TRIANGLE_STRIP&&f.mode!==Ke.TRIANGLE_FAN&&f.mode!==void 0)return null;let i=n.extensions[this.name].attributes,c=[],l={};for(let f in i)c.push(this.parser.getDependency("accessor",i[f]).then(d=>(l[f]=d,l[f])));return c.length<1?null:(c.push(this.parser.createNodeMesh(e)),Promise.all(c).then(f=>{let d=f.pop(),h=d.isGroup?d.children:[d],m=f[0].count,g=[];for(let y of h){let M=new v.Matrix4,A=new v.Vector3,b=new v.Quaternion,E=new v.Vector3(1,1,1),N=new v.InstancedMesh(y.geometry,y.material,m);for(let D=0;D<m;D++)l.TRANSLATION&&A.fromBufferAttribute(l.TRANSLATION,D),l.ROTATION&&b.fromBufferAttribute(l.ROTATION,D),l.SCALE&&E.fromBufferAttribute(l.SCALE,D),N.setMatrixAt(D,M.compose(A,b,E));for(let D in l)if(D==="_COLOR_0"){let L=l[D];N.instanceColor=new v.InstancedBufferAttribute(L.array,L.itemSize,L.normalized)}else D!=="TRANSLATION"&&D!=="ROTATION"&&D!=="SCALE"&&y.geometry.setAttribute(D,l[D]);v.Object3D.prototype.copy.call(N,y),this.parser.assignFinalMaterial(N),g.push(N)}return d.isGroup?(d.clear(),d.add(...g),d):g[0]}))}},Tn="glTF",Vt=12,xn={JSON:1313821514,BIN:5130562},Qr=class{constructor(e){this.name=le.KHR_BINARY_GLTF,this.content=null,this.body=null;let t=new DataView(e,0,Vt),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==Tn)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");let r=this.header.length-Vt,s=new DataView(e,Vt),i=0;for(;i<r;){let c=s.getUint32(i,!0);i+=4;let l=s.getUint32(i,!0);if(i+=4,l===xn.JSON){let f=new Uint8Array(e,Vt+i,c);this.content=n.decode(f)}else if(l===xn.BIN){let f=Vt+i;this.body=e.slice(f,f+c)}i+=c}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}},Jr=class{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=le.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){let n=this.json,r=this.dracoLoader,s=e.extensions[this.name].bufferView,i=e.extensions[this.name].attributes,c={},l={},f={};for(let d in i){let h=rn[d]||d.toLowerCase();c[h]=i[d]}for(let d in e.attributes){let h=rn[d]||d.toLowerCase();if(i[d]!==void 0){let m=n.accessors[e.attributes[d]],g=Tt[m.componentType];f[h]=g.name,l[h]=m.normalized===!0}}return t.getDependency("bufferView",s).then(function(d){return new Promise(function(h,m){r.decodeDracoFile(d,function(g){for(let y in g.attributes){let M=g.attributes[y],A=l[y];A!==void 0&&(M.normalized=A)}h(g)},c,f,v.LinearSRGBColorSpace,m)})})}},$r=class{constructor(){this.name=le.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){return(t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0||(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),e.needsUpdate=!0),e}},en=class{constructor(){this.name=le.KHR_MESH_QUANTIZATION}},dr=class extends v.Interpolant{constructor(e,t,n,r){super(e,t,n,r)}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,r=this.valueSize,s=e*r*3+r;for(let i=0;i!==r;i++)t[i]=n[s+i];return t}interpolate_(e,t,n,r){let s=this.resultBuffer,i=this.sampleValues,c=this.valueSize,l=c*2,f=c*3,d=r-t,h=(n-t)/d,m=h*h,g=m*h,y=e*f,M=y-f,A=-2*g+3*m,b=g-m,E=1-A,N=b-m+h;for(let D=0;D!==c;D++){let L=i[M+D+c],j=i[M+D+l]*d,F=i[y+D+c],S=i[y+D]*d;s[D]=E*L+N*j+A*F+b*S}return s}},xi=new v.Quaternion,tn=class extends dr{interpolate_(e,t,n,r){let s=super.interpolate_(e,t,n,r);return xi.fromArray(s).normalize().toArray(s),s}},Ke={FLOAT:5126,FLOAT_MAT3:35675,FLOAT_MAT4:35676,FLOAT_VEC2:35664,FLOAT_VEC3:35665,FLOAT_VEC4:35666,LINEAR:9729,REPEAT:10497,SAMPLER_2D:35678,POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6,UNSIGNED_BYTE:5121,UNSIGNED_SHORT:5123},Tt={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},wn={9728:v.NearestFilter,9729:v.LinearFilter,9984:v.NearestMipmapNearestFilter,9985:v.LinearMipmapNearestFilter,9986:v.NearestMipmapLinearFilter,9987:v.LinearMipmapLinearFilter},An={33071:v.ClampToEdgeWrapping,33648:v.MirroredRepeatWrapping,10497:v.RepeatWrapping},Nr={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},rn={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},ct={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},wi={CUBICSPLINE:void 0,LINEAR:v.InterpolateLinear,STEP:v.InterpolateDiscrete},Ur={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function Ai(a){return a.DefaultMaterial===void 0&&(a.DefaultMaterial=new v.MeshStandardMaterial({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:v.FrontSide})),a.DefaultMaterial}function gt(a,e,t){for(let n in t.extensions)a[n]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[n]=t.extensions[n])}function ut(a,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(a.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function Si(a,e,t){let n=!1,r=!1,s=!1;for(let f=0,d=e.length;f<d;f++){let h=e[f];if(h.POSITION!==void 0&&(n=!0),h.NORMAL!==void 0&&(r=!0),h.COLOR_0!==void 0&&(s=!0),n&&r&&s)break}if(!n&&!r&&!s)return Promise.resolve(a);let i=[],c=[],l=[];for(let f=0,d=e.length;f<d;f++){let h=e[f];if(n){let m=h.POSITION!==void 0?t.getDependency("accessor",h.POSITION):a.attributes.position;i.push(m)}if(r){let m=h.NORMAL!==void 0?t.getDependency("accessor",h.NORMAL):a.attributes.normal;c.push(m)}if(s){let m=h.COLOR_0!==void 0?t.getDependency("accessor",h.COLOR_0):a.attributes.color;l.push(m)}}return Promise.all([Promise.all(i),Promise.all(c),Promise.all(l)]).then(function(f){let d=f[0],h=f[1],m=f[2];return n&&(a.morphAttributes.position=d),r&&(a.morphAttributes.normal=h),s&&(a.morphAttributes.color=m),a.morphTargetsRelative=!0,a})}function Ti(a,e){if(a.updateMorphTargets(),e.weights!==void 0)for(let t=0,n=e.weights.length;t<n;t++)a.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){let t=e.extras.targetNames;if(a.morphTargetInfluences.length===t.length){a.morphTargetDictionary={};for(let n=0,r=t.length;n<r;n++)a.morphTargetDictionary[t[n]]=n}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function Mi(a){let e,t=a.extensions&&a.extensions[le.KHR_DRACO_MESH_COMPRESSION];if(t?e="draco:"+t.bufferView+":"+t.indices+":"+Lr(t.attributes):e=a.indices+":"+Lr(a.attributes)+":"+a.mode,a.targets!==void 0)for(let n=0,r=a.targets.length;n<r;n++)e+=":"+Lr(a.targets[n]);return e}function Lr(a){let e="",t=Object.keys(a).sort();for(let n=0,r=t.length;n<r;n++)e+=t[n]+":"+a[t[n]]+";";return e}function nn(a){switch(a){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function yi(a){return a.search(/\.jpe?g($|\?)/i)>0||a.search(/^data\:image\/jpeg/)===0?"image/jpeg":a.search(/\.webp($|\?)/i)>0||a.search(/^data\:image\/webp/)===0?"image/webp":"image/png"}var bi=new v.Matrix4,sn=class{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new gi,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,r=!1,s=-1;typeof navigator<"u"&&(n=/^((?!chrome|android).)*safari/i.test(navigator.userAgent)===!0,r=navigator.userAgent.indexOf("Firefox")>-1,s=r?navigator.userAgent.match(/Firefox\/([0-9]+)\./)[1]:-1),typeof createImageBitmap>"u"||n||r&&s<98?this.textureLoader=new v.TextureLoader(this.options.manager):this.textureLoader=new v.ImageBitmapLoader(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new v.FileLoader(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){let n=this,r=this.json,s=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(i){return i._markDefs&&i._markDefs()}),Promise.all(this._invokeAll(function(i){return i.beforeRoot&&i.beforeRoot()})).then(function(){return Promise.all([n.getDependencies("scene"),n.getDependencies("animation"),n.getDependencies("camera")])}).then(function(i){let c={scene:i[0][r.scene||0],scenes:i[0],animations:i[1],cameras:i[2],asset:r.asset,parser:n,userData:{}};return gt(s,c,r),ut(c,r),Promise.all(n._invokeAll(function(l){return l.afterRoot&&l.afterRoot(c)})).then(function(){e(c)})}).catch(t)}_markDefs(){let e=this.json.nodes||[],t=this.json.skins||[],n=this.json.meshes||[];for(let r=0,s=t.length;r<s;r++){let i=t[r].joints;for(let c=0,l=i.length;c<l;c++)e[i[c]].isBone=!0}for(let r=0,s=e.length;r<s;r++){let i=e[r];i.mesh!==void 0&&(this._addNodeRef(this.meshCache,i.mesh),i.skin!==void 0&&(n[i.mesh].isSkinnedMesh=!0)),i.camera!==void 0&&this._addNodeRef(this.cameraCache,i.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,n){if(e.refs[t]<=1)return n;let r=n.clone(),s=(i,c)=>{let l=this.associations.get(i);l!=null&&this.associations.set(c,l);for(let[f,d]of i.children.entries())s(d,c.children[f])};return s(n,r),r.name+="_instance_"+e.uses[t]++,r}_invokeOne(e){let t=Object.values(this.plugins);t.push(this);for(let n=0;n<t.length;n++){let r=e(t[n]);if(r)return r}return null}_invokeAll(e){let t=Object.values(this.plugins);t.unshift(this);let n=[];for(let r=0;r<t.length;r++){let s=e(t[r]);s&&n.push(s)}return n}getDependency(e,t){let n=e+":"+t,r=this.cache.get(n);if(!r){switch(e){case"scene":r=this.loadScene(t);break;case"node":r=this._invokeOne(function(s){return s.loadNode&&s.loadNode(t)});break;case"mesh":r=this._invokeOne(function(s){return s.loadMesh&&s.loadMesh(t)});break;case"accessor":r=this.loadAccessor(t);break;case"bufferView":r=this._invokeOne(function(s){return s.loadBufferView&&s.loadBufferView(t)});break;case"buffer":r=this.loadBuffer(t);break;case"material":r=this._invokeOne(function(s){return s.loadMaterial&&s.loadMaterial(t)});break;case"texture":r=this._invokeOne(function(s){return s.loadTexture&&s.loadTexture(t)});break;case"skin":r=this.loadSkin(t);break;case"animation":r=this._invokeOne(function(s){return s.loadAnimation&&s.loadAnimation(t)});break;case"camera":r=this.loadCamera(t);break;default:if(r=this._invokeOne(function(s){return s!=this&&s.getDependency&&s.getDependency(e,t)}),!r)throw new Error("Unknown type: "+e);break}this.cache.add(n,r)}return r}getDependencies(e){let t=this.cache.get(e);if(!t){let n=this,r=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(r.map(function(s,i){return n.getDependency(e,i)})),this.cache.add(e,t)}return t}loadBuffer(e){let t=this.json.buffers[e],n=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[le.KHR_BINARY_GLTF].body);let r=this.options;return new Promise(function(s,i){n.load(v.LoaderUtils.resolveURL(t.uri,r.path),s,void 0,function(){i(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){let t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(n){let r=t.byteLength||0,s=t.byteOffset||0;return n.slice(s,s+r)})}loadAccessor(e){let t=this,n=this.json,r=this.json.accessors[e];if(r.bufferView===void 0&&r.sparse===void 0){let i=Nr[r.type],c=Tt[r.componentType],l=r.normalized===!0,f=new c(r.count*i);return Promise.resolve(new v.BufferAttribute(f,i,l))}let s=[];return r.bufferView!==void 0?s.push(this.getDependency("bufferView",r.bufferView)):s.push(null),r.sparse!==void 0&&(s.push(this.getDependency("bufferView",r.sparse.indices.bufferView)),s.push(this.getDependency("bufferView",r.sparse.values.bufferView))),Promise.all(s).then(function(i){let c=i[0],l=Nr[r.type],f=Tt[r.componentType],d=f.BYTES_PER_ELEMENT,h=d*l,m=r.byteOffset||0,g=r.bufferView!==void 0?n.bufferViews[r.bufferView].byteStride:void 0,y=r.normalized===!0,M,A;if(g&&g!==h){let b=Math.floor(m/g),E="InterleavedBuffer:"+r.bufferView+":"+r.componentType+":"+b+":"+r.count,N=t.cache.get(E);N||(M=new f(c,b*g,r.count*g/d),N=new v.InterleavedBuffer(M,g/d),t.cache.add(E,N)),A=new v.InterleavedBufferAttribute(N,l,m%g/d,y)}else c===null?M=new f(r.count*l):M=new f(c,m,r.count*l),A=new v.BufferAttribute(M,l,y);if(r.sparse!==void 0){let b=Nr.SCALAR,E=Tt[r.sparse.indices.componentType],N=r.sparse.indices.byteOffset||0,D=r.sparse.values.byteOffset||0,L=new E(i[1],N,r.sparse.count*b),j=new f(i[2],D,r.sparse.count*l);c!==null&&(A=new v.BufferAttribute(A.array.slice(),A.itemSize,A.normalized));for(let F=0,S=L.length;F<S;F++){let R=L[F];if(A.setX(R,j[F*l]),l>=2&&A.setY(R,j[F*l+1]),l>=3&&A.setZ(R,j[F*l+2]),l>=4&&A.setW(R,j[F*l+3]),l>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}}return A})}loadTexture(e){let t=this.json,n=this.options,s=t.textures[e].source,i=t.images[s],c=this.textureLoader;if(i.uri){let l=n.manager.getHandler(i.uri);l!==null&&(c=l)}return this.loadTextureImage(e,s,c)}loadTextureImage(e,t,n){let r=this,s=this.json,i=s.textures[e],c=s.images[t],l=(c.uri||c.bufferView)+":"+i.sampler;if(this.textureCache[l])return this.textureCache[l];let f=this.loadImageSource(t,n).then(function(d){d.flipY=!1,d.name=i.name||c.name||"",d.name===""&&typeof c.uri=="string"&&c.uri.startsWith("data:image/")===!1&&(d.name=c.uri);let m=(s.samplers||{})[i.sampler]||{};return d.magFilter=wn[m.magFilter]||v.LinearFilter,d.minFilter=wn[m.minFilter]||v.LinearMipmapLinearFilter,d.wrapS=An[m.wrapS]||v.RepeatWrapping,d.wrapT=An[m.wrapT]||v.RepeatWrapping,r.associations.set(d,{textures:e}),d}).catch(function(){return null});return this.textureCache[l]=f,f}loadImageSource(e,t){let n=this,r=this.json,s=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(h=>h.clone());let i=r.images[e],c=self.URL||self.webkitURL,l=i.uri||"",f=!1;if(i.bufferView!==void 0)l=n.getDependency("bufferView",i.bufferView).then(function(h){f=!0;let m=new Blob([h],{type:i.mimeType});return l=c.createObjectURL(m),l});else if(i.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");let d=Promise.resolve(l).then(function(h){return new Promise(function(m,g){let y=m;t.isImageBitmapLoader===!0&&(y=function(M){let A=new v.Texture(M);A.needsUpdate=!0,m(A)}),t.load(v.LoaderUtils.resolveURL(h,s.path),y,void 0,g)})}).then(function(h){return f===!0&&c.revokeObjectURL(l),h.userData.mimeType=i.mimeType||yi(i.uri),h}).catch(function(h){throw console.error("THREE.GLTFLoader: Couldn't load texture",l),h});return this.sourceCache[e]=d,d}assignTexture(e,t,n,r){let s=this;return this.getDependency("texture",n.index).then(function(i){if(!i)return null;if(n.texCoord!==void 0&&n.texCoord>0&&(i=i.clone(),i.channel=n.texCoord),s.extensions[le.KHR_TEXTURE_TRANSFORM]){let c=n.extensions!==void 0?n.extensions[le.KHR_TEXTURE_TRANSFORM]:void 0;if(c){let l=s.associations.get(i);i=s.extensions[le.KHR_TEXTURE_TRANSFORM].extendTexture(i,c),s.associations.set(i,l)}}return r!==void 0&&(i.colorSpace=r),e[t]=i,i})}assignFinalMaterial(e){let t=e.geometry,n=e.material,r=t.attributes.tangent===void 0,s=t.attributes.color!==void 0,i=t.attributes.normal===void 0;if(e.isPoints){let c="PointsMaterial:"+n.uuid,l=this.cache.get(c);l||(l=new v.PointsMaterial,v.Material.prototype.copy.call(l,n),l.color.copy(n.color),l.map=n.map,l.sizeAttenuation=!1,this.cache.add(c,l)),n=l}else if(e.isLine){let c="LineBasicMaterial:"+n.uuid,l=this.cache.get(c);l||(l=new v.LineBasicMaterial,v.Material.prototype.copy.call(l,n),l.color.copy(n.color),l.map=n.map,this.cache.add(c,l)),n=l}if(r||s||i){let c="ClonedMaterial:"+n.uuid+":";r&&(c+="derivative-tangents:"),s&&(c+="vertex-colors:"),i&&(c+="flat-shading:");let l=this.cache.get(c);l||(l=n.clone(),s&&(l.vertexColors=!0),i&&(l.flatShading=!0),r&&(l.normalScale&&(l.normalScale.y*=-1),l.clearcoatNormalScale&&(l.clearcoatNormalScale.y*=-1)),this.cache.add(c,l),this.associations.set(l,this.associations.get(n))),n=l}e.material=n}getMaterialType(){return v.MeshStandardMaterial}loadMaterial(e){let t=this,n=this.json,r=this.extensions,s=n.materials[e],i,c={},l=s.extensions||{},f=[];if(l[le.KHR_MATERIALS_UNLIT]){let h=r[le.KHR_MATERIALS_UNLIT];i=h.getMaterialType(),f.push(h.extendParams(c,s,t))}else{let h=s.pbrMetallicRoughness||{};if(c.color=new v.Color(1,1,1),c.opacity=1,Array.isArray(h.baseColorFactor)){let m=h.baseColorFactor;c.color.setRGB(m[0],m[1],m[2],v.LinearSRGBColorSpace),c.opacity=m[3]}h.baseColorTexture!==void 0&&f.push(t.assignTexture(c,"map",h.baseColorTexture,v.SRGBColorSpace)),c.metalness=h.metallicFactor!==void 0?h.metallicFactor:1,c.roughness=h.roughnessFactor!==void 0?h.roughnessFactor:1,h.metallicRoughnessTexture!==void 0&&(f.push(t.assignTexture(c,"metalnessMap",h.metallicRoughnessTexture)),f.push(t.assignTexture(c,"roughnessMap",h.metallicRoughnessTexture))),i=this._invokeOne(function(m){return m.getMaterialType&&m.getMaterialType(e)}),f.push(Promise.all(this._invokeAll(function(m){return m.extendMaterialParams&&m.extendMaterialParams(e,c)})))}s.doubleSided===!0&&(c.side=v.DoubleSide);let d=s.alphaMode||Ur.OPAQUE;if(d===Ur.BLEND?(c.transparent=!0,c.depthWrite=!1):(c.transparent=!1,d===Ur.MASK&&(c.alphaTest=s.alphaCutoff!==void 0?s.alphaCutoff:.5)),s.normalTexture!==void 0&&i!==v.MeshBasicMaterial&&(f.push(t.assignTexture(c,"normalMap",s.normalTexture)),c.normalScale=new v.Vector2(1,1),s.normalTexture.scale!==void 0)){let h=s.normalTexture.scale;c.normalScale.set(h,h)}if(s.occlusionTexture!==void 0&&i!==v.MeshBasicMaterial&&(f.push(t.assignTexture(c,"aoMap",s.occlusionTexture)),s.occlusionTexture.strength!==void 0&&(c.aoMapIntensity=s.occlusionTexture.strength)),s.emissiveFactor!==void 0&&i!==v.MeshBasicMaterial){let h=s.emissiveFactor;c.emissive=new v.Color().setRGB(h[0],h[1],h[2],v.LinearSRGBColorSpace)}return s.emissiveTexture!==void 0&&i!==v.MeshBasicMaterial&&f.push(t.assignTexture(c,"emissiveMap",s.emissiveTexture,v.SRGBColorSpace)),Promise.all(f).then(function(){let h=new i(c);return s.name&&(h.name=s.name),ut(h,s),t.associations.set(h,{materials:e}),s.extensions&&gt(r,h,s),h})}createUniqueName(e){let t=v.PropertyBinding.sanitizeNodeName(e||"");return t in this.nodeNamesUsed?t+"_"+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){let t=this,n=this.extensions,r=this.primitiveCache;function s(c){return n[le.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(c,t).then(function(l){return Sn(l,c,t)})}let i=[];for(let c=0,l=e.length;c<l;c++){let f=e[c],d=Mi(f),h=r[d];if(h)i.push(h.promise);else{let m;f.extensions&&f.extensions[le.KHR_DRACO_MESH_COMPRESSION]?m=s(f):m=Sn(new v.BufferGeometry,f,t),r[d]={primitive:f,promise:m},i.push(m)}}return Promise.all(i)}loadMesh(e){let t=this,n=this.json,r=this.extensions,s=n.meshes[e],i=s.primitives,c=[];for(let l=0,f=i.length;l<f;l++){let d=i[l].material===void 0?Ai(this.cache):this.getDependency("material",i[l].material);c.push(d)}return c.push(t.loadGeometries(i)),Promise.all(c).then(function(l){let f=l.slice(0,l.length-1),d=l[l.length-1],h=[];for(let g=0,y=d.length;g<y;g++){let M=d[g],A=i[g],b,E=f[g];if(A.mode===Ke.TRIANGLES||A.mode===Ke.TRIANGLE_STRIP||A.mode===Ke.TRIANGLE_FAN||A.mode===void 0)b=s.isSkinnedMesh===!0?new v.SkinnedMesh(M,E):new v.Mesh(M,E),b.isSkinnedMesh===!0&&b.normalizeSkinWeights(),A.mode===Ke.TRIANGLE_STRIP?b.geometry=fr(b.geometry,v.TriangleStripDrawMode):A.mode===Ke.TRIANGLE_FAN&&(b.geometry=fr(b.geometry,v.TriangleFanDrawMode));else if(A.mode===Ke.LINES)b=new v.LineSegments(M,E);else if(A.mode===Ke.LINE_STRIP)b=new v.Line(M,E);else if(A.mode===Ke.LINE_LOOP)b=new v.LineLoop(M,E);else if(A.mode===Ke.POINTS)b=new v.Points(M,E);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+A.mode);Object.keys(b.geometry.morphAttributes).length>0&&Ti(b,s),b.name=t.createUniqueName(s.name||"mesh_"+e),ut(b,s),A.extensions&&gt(r,b,A),t.assignFinalMaterial(b),h.push(b)}for(let g=0,y=h.length;g<y;g++)t.associations.set(h[g],{meshes:e,primitives:g});if(h.length===1)return s.extensions&&gt(r,h[0],s),h[0];let m=new v.Group;s.extensions&&gt(r,m,s),t.associations.set(m,{meshes:e});for(let g=0,y=h.length;g<y;g++)m.add(h[g]);return m})}loadCamera(e){let t,n=this.json.cameras[e],r=n[n.type];if(!r){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return n.type==="perspective"?t=new v.PerspectiveCamera(v.MathUtils.radToDeg(r.yfov),r.aspectRatio||1,r.znear||1,r.zfar||2e6):n.type==="orthographic"&&(t=new v.OrthographicCamera(-r.xmag,r.xmag,r.ymag,-r.ymag,r.znear,r.zfar)),n.name&&(t.name=this.createUniqueName(n.name)),ut(t,n),Promise.resolve(t)}loadSkin(e){let t=this.json.skins[e],n=[];for(let r=0,s=t.joints.length;r<s;r++)n.push(this._loadNodeShallow(t.joints[r]));return t.inverseBindMatrices!==void 0?n.push(this.getDependency("accessor",t.inverseBindMatrices)):n.push(null),Promise.all(n).then(function(r){let s=r.pop(),i=r,c=[],l=[];for(let f=0,d=i.length;f<d;f++){let h=i[f];if(h){c.push(h);let m=new v.Matrix4;s!==null&&m.fromArray(s.array,f*16),l.push(m)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[f])}return new v.Skeleton(c,l)})}loadAnimation(e){let t=this.json,n=this,r=t.animations[e],s=r.name?r.name:"animation_"+e,i=[],c=[],l=[],f=[],d=[];for(let h=0,m=r.channels.length;h<m;h++){let g=r.channels[h],y=r.samplers[g.sampler],M=g.target,A=M.node,b=r.parameters!==void 0?r.parameters[y.input]:y.input,E=r.parameters!==void 0?r.parameters[y.output]:y.output;M.node!==void 0&&(i.push(this.getDependency("node",A)),c.push(this.getDependency("accessor",b)),l.push(this.getDependency("accessor",E)),f.push(y),d.push(M))}return Promise.all([Promise.all(i),Promise.all(c),Promise.all(l),Promise.all(f),Promise.all(d)]).then(function(h){let m=h[0],g=h[1],y=h[2],M=h[3],A=h[4],b=[];for(let E=0,N=m.length;E<N;E++){let D=m[E],L=g[E],j=y[E],F=M[E],S=A[E];if(D===void 0)continue;D.updateMatrix&&D.updateMatrix();let R=n._createAnimationTracks(D,L,j,F,S);if(R)for(let U=0;U<R.length;U++)b.push(R[U])}return new v.AnimationClip(s,void 0,b)})}createNodeMesh(e){let t=this.json,n=this,r=t.nodes[e];return r.mesh===void 0?null:n.getDependency("mesh",r.mesh).then(function(s){let i=n._getNodeRef(n.meshCache,r.mesh,s);return r.weights!==void 0&&i.traverse(function(c){if(c.isMesh)for(let l=0,f=r.weights.length;l<f;l++)c.morphTargetInfluences[l]=r.weights[l]}),i})}loadNode(e){let t=this.json,n=this,r=t.nodes[e],s=n._loadNodeShallow(e),i=[],c=r.children||[];for(let f=0,d=c.length;f<d;f++)i.push(n.getDependency("node",c[f]));let l=r.skin===void 0?Promise.resolve(null):n.getDependency("skin",r.skin);return Promise.all([s,Promise.all(i),l]).then(function(f){let d=f[0],h=f[1],m=f[2];m!==null&&d.traverse(function(g){g.isSkinnedMesh&&g.bind(m,bi)});for(let g=0,y=h.length;g<y;g++)d.add(h[g]);return d})}_loadNodeShallow(e){let t=this.json,n=this.extensions,r=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];let s=t.nodes[e],i=s.name?r.createUniqueName(s.name):"",c=[],l=r._invokeOne(function(f){return f.createNodeMesh&&f.createNodeMesh(e)});return l&&c.push(l),s.camera!==void 0&&c.push(r.getDependency("camera",s.camera).then(function(f){return r._getNodeRef(r.cameraCache,s.camera,f)})),r._invokeAll(function(f){return f.createNodeAttachment&&f.createNodeAttachment(e)}).forEach(function(f){c.push(f)}),this.nodeCache[e]=Promise.all(c).then(function(f){let d;if(s.isBone===!0?d=new v.Bone:f.length>1?d=new v.Group:f.length===1?d=f[0]:d=new v.Object3D,d!==f[0])for(let h=0,m=f.length;h<m;h++)d.add(f[h]);if(s.name&&(d.userData.name=s.name,d.name=i),ut(d,s),s.extensions&&gt(n,d,s),s.matrix!==void 0){let h=new v.Matrix4;h.fromArray(s.matrix),d.applyMatrix4(h)}else s.translation!==void 0&&d.position.fromArray(s.translation),s.rotation!==void 0&&d.quaternion.fromArray(s.rotation),s.scale!==void 0&&d.scale.fromArray(s.scale);return r.associations.has(d)||r.associations.set(d,{}),r.associations.get(d).nodes=e,d}),this.nodeCache[e]}loadScene(e){let t=this.extensions,n=this.json.scenes[e],r=this,s=new v.Group;n.name&&(s.name=r.createUniqueName(n.name)),ut(s,n),n.extensions&&gt(t,s,n);let i=n.nodes||[],c=[];for(let l=0,f=i.length;l<f;l++)c.push(r.getDependency("node",i[l]));return Promise.all(c).then(function(l){for(let d=0,h=l.length;d<h;d++)s.add(l[d]);let f=d=>{let h=new Map;for(let[m,g]of r.associations)(m instanceof v.Material||m instanceof v.Texture)&&h.set(m,g);return d.traverse(m=>{let g=r.associations.get(m);g!=null&&h.set(m,g)}),h};return r.associations=f(s),s})}_createAnimationTracks(e,t,n,r,s){let i=[],c=e.name?e.name:e.uuid,l=[];ct[s.path]===ct.weights?e.traverse(function(m){m.morphTargetInfluences&&l.push(m.name?m.name:m.uuid)}):l.push(c);let f;switch(ct[s.path]){case ct.weights:f=v.NumberKeyframeTrack;break;case ct.rotation:f=v.QuaternionKeyframeTrack;break;case ct.position:case ct.scale:f=v.VectorKeyframeTrack;break;default:switch(n.itemSize){case 1:f=v.NumberKeyframeTrack;break;case 2:case 3:default:f=v.VectorKeyframeTrack;break}break}let d=r.interpolation!==void 0?wi[r.interpolation]:v.InterpolateLinear,h=this._getArrayFromAccessor(n);for(let m=0,g=l.length;m<g;m++){let y=new f(l[m]+"."+ct[s.path],t.array,h,d);r.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(y),i.push(y)}return i}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){let n=nn(t.constructor),r=new Float32Array(t.length);for(let s=0,i=t.length;s<i;s++)r[s]=t[s]*n;t=r}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(n){let r=this instanceof v.QuaternionKeyframeTrack?tn:dr;return new r(this.times,this.values,this.getValueSize()/3,n)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}};function Ei(a,e,t){let n=e.attributes,r=new v.Box3;if(n.POSITION!==void 0){let c=t.json.accessors[n.POSITION],l=c.min,f=c.max;if(l!==void 0&&f!==void 0){if(r.set(new v.Vector3(l[0],l[1],l[2]),new v.Vector3(f[0],f[1],f[2])),c.normalized){let d=nn(Tt[c.componentType]);r.min.multiplyScalar(d),r.max.multiplyScalar(d)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;let s=e.targets;if(s!==void 0){let c=new v.Vector3,l=new v.Vector3;for(let f=0,d=s.length;f<d;f++){let h=s[f];if(h.POSITION!==void 0){let m=t.json.accessors[h.POSITION],g=m.min,y=m.max;if(g!==void 0&&y!==void 0){if(l.setX(Math.max(Math.abs(g[0]),Math.abs(y[0]))),l.setY(Math.max(Math.abs(g[1]),Math.abs(y[1]))),l.setZ(Math.max(Math.abs(g[2]),Math.abs(y[2]))),m.normalized){let M=nn(Tt[m.componentType]);l.multiplyScalar(M)}c.max(l)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}r.expandByVector(c)}a.boundingBox=r;let i=new v.Sphere;r.getCenter(i.center),i.radius=r.min.distanceTo(r.max)/2,a.boundingSphere=i}function Sn(a,e,t){let n=e.attributes,r=[];function s(i,c){return t.getDependency("accessor",i).then(function(l){a.setAttribute(c,l)})}for(let i in n){let c=rn[i]||i.toLowerCase();c in a.attributes||r.push(s(n[i],c))}if(e.indices!==void 0&&!a.index){let i=t.getDependency("accessor",e.indices).then(function(c){a.setIndex(c)});r.push(i)}return v.ColorManagement.workingColorSpace!==v.LinearSRGBColorSpace&&"COLOR_0"in n&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${v.ColorManagement.workingColorSpace}" not supported.`),ut(a,e),Ei(a,e,t),Promise.all(r).then(function(){return e.targets!==void 0?Si(a,e.targets,t):a})}var Ne=Ae(ge(),1),pr=class extends Ne.DataTextureLoader{constructor(e){super(e),this.type=Ne.HalfFloatType}parse(e){let i=function(S,R){switch(S){case 1:throw new Error("THREE.RGBELoader: Read Error: "+(R||""));case 2:throw new Error("THREE.RGBELoader: Write Error: "+(R||""));case 3:throw new Error("THREE.RGBELoader: Bad File Format: "+(R||""));default:case 4:throw new Error("THREE.RGBELoader: Memory Error: "+(R||""))}},d=`
`,h=function(S,R,U){R=R||1024;let B=S.pos,_=-1,G=0,q="",V=String.fromCharCode.apply(null,new Uint16Array(S.subarray(B,B+128)));for(;0>(_=V.indexOf(d))&&G<R&&B<S.byteLength;)q+=V,G+=V.length,B+=128,V+=String.fromCharCode.apply(null,new Uint16Array(S.subarray(B,B+128)));return-1<_?(U!==!1&&(S.pos+=G+_+1),q+V.slice(0,_)):!1},m=function(S){let R=/^#\?(\S+)/,U=/^\s*GAMMA\s*=\s*(\d+(\.\d+)?)\s*$/,H=/^\s*EXPOSURE\s*=\s*(\d+(\.\d+)?)\s*$/,B=/^\s*FORMAT=(\S+)\s*$/,_=/^\s*\-Y\s+(\d+)\s+\+X\s+(\d+)\s*$/,G={valid:0,string:"",comments:"",programtype:"RGBE",format:"",gamma:1,exposure:1,width:0,height:0},q,V;for((S.pos>=S.byteLength||!(q=h(S)))&&i(1,"no header found"),(V=q.match(R))||i(3,"bad initial token"),G.valid|=1,G.programtype=V[1],G.string+=q+`
`;q=h(S),q!==!1;){if(G.string+=q+`
`,q.charAt(0)==="#"){G.comments+=q+`
`;continue}if((V=q.match(U))&&(G.gamma=parseFloat(V[1])),(V=q.match(H))&&(G.exposure=parseFloat(V[1])),(V=q.match(B))&&(G.valid|=2,G.format=V[1]),(V=q.match(_))&&(G.valid|=4,G.height=parseInt(V[1],10),G.width=parseInt(V[2],10)),G.valid&2&&G.valid&4)break}return G.valid&2||i(3,"missing format specifier"),G.valid&4||i(3,"missing image size specifier"),G},g=function(S,R,U){let H=R;if(H<8||H>32767||S[0]!==2||S[1]!==2||S[2]&128)return new Uint8Array(S);H!==(S[2]<<8|S[3])&&i(3,"wrong scanline width");let B=new Uint8Array(4*R*U);B.length||i(4,"unable to allocate buffer space");let _=0,G=0,q=4*H,V=new Uint8Array(4),Se=new Uint8Array(q),Me=U;for(;Me>0&&G<S.byteLength;){G+4>S.byteLength&&i(1),V[0]=S[G++],V[1]=S[G++],V[2]=S[G++],V[3]=S[G++],(V[0]!=2||V[1]!=2||(V[2]<<8|V[3])!=H)&&i(3,"bad rgbe scanline format");let ee=0,ie;for(;ee<q&&G<S.byteLength;){ie=S[G++];let ae=ie>128;if(ae&&(ie-=128),(ie===0||ee+ie>q)&&i(3,"bad scanline data"),ae){let fe=S[G++];for(let be=0;be<ie;be++)Se[ee++]=fe}else Se.set(S.subarray(G,G+ie),ee),ee+=ie,G+=ie}let ye=H;for(let ae=0;ae<ye;ae++){let fe=0;B[_]=Se[ae+fe],fe+=H,B[_+1]=Se[ae+fe],fe+=H,B[_+2]=Se[ae+fe],fe+=H,B[_+3]=Se[ae+fe],_+=4}Me--}return B},y=function(S,R,U,H){let B=S[R+3],_=Math.pow(2,B-128)/255;U[H+0]=S[R+0]*_,U[H+1]=S[R+1]*_,U[H+2]=S[R+2]*_,U[H+3]=1},M=function(S,R,U,H){let B=S[R+3],_=Math.pow(2,B-128)/255;U[H+0]=Ne.DataUtils.toHalfFloat(Math.min(S[R+0]*_,65504)),U[H+1]=Ne.DataUtils.toHalfFloat(Math.min(S[R+1]*_,65504)),U[H+2]=Ne.DataUtils.toHalfFloat(Math.min(S[R+2]*_,65504)),U[H+3]=Ne.DataUtils.toHalfFloat(1)},A=new Uint8Array(e);A.pos=0;let b=m(A),E=b.width,N=b.height,D=g(A.subarray(A.pos),E,N),L,j,F;switch(this.type){case Ne.FloatType:F=D.length/4;let S=new Float32Array(F*4);for(let U=0;U<F;U++)y(D,U*4,S,U*4);L=S,j=Ne.FloatType;break;case Ne.HalfFloatType:F=D.length/4;let R=new Uint16Array(F*4);for(let U=0;U<F;U++)M(D,U*4,R,U*4);L=R,j=Ne.HalfFloatType;break;default:throw new Error("THREE.RGBELoader: Unsupported type: "+this.type)}return{width:E,height:N,data:L,header:b.string,gamma:b.gamma,exposure:b.exposure,type:j}}setDataType(e){return this.type=e,this}load(e,t,n,r){function s(i,c){switch(i.type){case Ne.FloatType:case Ne.HalfFloatType:i.colorSpace=Ne.LinearSRGBColorSpace,i.minFilter=Ne.LinearFilter,i.magFilter=Ne.LinearFilter,i.generateMipmaps=!1,i.flipY=!0;break}t&&t(i,c)}return super.load(e,s,n,r)}};var xe=Ae(ge(),1);var Mn=function(a){return URL.createObjectURL(new Blob([a],{type:"text/javascript"}))},Ci=function(a){return new Worker(a)};try{URL.revokeObjectURL(Mn(""))}catch{Mn=function(e){return"data:application/javascript;charset=UTF-8,"+encodeURI(e)},Ci=function(e){return new Worker(e,{type:"module"})}}var Ye=Uint8Array,ft=Uint16Array,ln=Uint32Array,yn=new Ye([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0,0]),bn=new Ye([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,0,0]),Di=new Ye([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),En=function(a,e){for(var t=new ft(31),n=0;n<31;++n)t[n]=e+=1<<a[n-1];for(var r=new ln(t[30]),n=1;n<30;++n)for(var s=t[n];s<t[n+1];++s)r[s]=s-t[n]<<5|n;return[t,r]},Cn=En(yn,2),Dn=Cn[0],Ri=Cn[1];Dn[28]=258,Ri[258]=28;var Rn=En(bn,0),Pi=Rn[0],es=Rn[1],cn=new ft(32768);for(he=0;he<32768;++he)it=(he&43690)>>>1|(he&21845)<<1,it=(it&52428)>>>2|(it&13107)<<2,it=(it&61680)>>>4|(it&3855)<<4,cn[he]=((it&65280)>>>8|(it&255)<<8)>>>1;var it,he,Wt=function(a,e,t){for(var n=a.length,r=0,s=new ft(e);r<n;++r)++s[a[r]-1];var i=new ft(e);for(r=0;r<e;++r)i[r]=i[r-1]+s[r-1]<<1;var c;if(t){c=new ft(1<<e);var l=15-e;for(r=0;r<n;++r)if(a[r])for(var f=r<<4|a[r],d=e-a[r],h=i[a[r]-1]++<<d,m=h|(1<<d)-1;h<=m;++h)c[cn[h]>>>l]=f}else for(c=new ft(n),r=0;r<n;++r)a[r]&&(c[r]=cn[i[a[r]-1]++]>>>15-a[r]);return c},jt=new Ye(288);for(he=0;he<144;++he)jt[he]=8;var he;for(he=144;he<256;++he)jt[he]=9;var he;for(he=256;he<280;++he)jt[he]=7;var he;for(he=280;he<288;++he)jt[he]=8;var he,Pn=new Ye(32);for(he=0;he<32;++he)Pn[he]=5;var he;var Ni=Wt(jt,9,1);var Ui=Wt(Pn,5,1),on=function(a){for(var e=a[0],t=1;t<a.length;++t)a[t]>e&&(e=a[t]);return e},Je=function(a,e,t){var n=e/8|0;return(a[n]|a[n+1]<<8)>>(e&7)&t},an=function(a,e){var t=e/8|0;return(a[t]|a[t+1]<<8|a[t+2]<<16)>>(e&7)},Li=function(a){return(a/8|0)+(a&7&&1)},Ii=function(a,e,t){(e==null||e<0)&&(e=0),(t==null||t>a.length)&&(t=a.length);var n=new(a instanceof ft?ft:a instanceof ln?ln:Ye)(t-e);return n.set(a.subarray(e,t)),n},Oi=function(a,e,t){var n=a.length;if(!n||t&&!t.l&&n<5)return e||new Ye(0);var r=!e||t,s=!t||t.i;t||(t={}),e||(e=new Ye(n*3));var i=function(te){var Re=e.length;if(te>Re){var Te=new Ye(Math.max(Re*2,te));Te.set(e),e=Te}},c=t.f||0,l=t.p||0,f=t.b||0,d=t.l,h=t.d,m=t.m,g=t.n,y=n*8;do{if(!d){t.f=c=Je(a,l,1);var M=Je(a,l+1,3);if(l+=3,M)if(M==1)d=Ni,h=Ui,m=9,g=5;else if(M==2){var N=Je(a,l,31)+257,D=Je(a,l+10,15)+4,L=N+Je(a,l+5,31)+1;l+=14;for(var j=new Ye(L),F=new Ye(19),S=0;S<D;++S)F[Di[S]]=Je(a,l+S*3,7);l+=D*3;for(var R=on(F),U=(1<<R)-1,H=Wt(F,R,1),S=0;S<L;){var B=H[Je(a,l,U)];l+=B&15;var A=B>>>4;if(A<16)j[S++]=A;else{var _=0,G=0;for(A==16?(G=3+Je(a,l,3),l+=2,_=j[S-1]):A==17?(G=3+Je(a,l,7),l+=3):A==18&&(G=11+Je(a,l,127),l+=7);G--;)j[S++]=_}}var q=j.subarray(0,N),V=j.subarray(N);m=on(q),g=on(V),d=Wt(q,m,1),h=Wt(V,g,1)}else throw"invalid block type";else{var A=Li(l)+4,b=a[A-4]|a[A-3]<<8,E=A+b;if(E>n){if(s)throw"unexpected EOF";break}r&&i(f+b),e.set(a.subarray(A,E),f),t.b=f+=b,t.p=l=E*8;continue}if(l>y){if(s)throw"unexpected EOF";break}}r&&i(f+131072);for(var Se=(1<<m)-1,Me=(1<<g)-1,ee=l;;ee=l){var _=d[an(a,l)&Se],ie=_>>>4;if(l+=_&15,l>y){if(s)throw"unexpected EOF";break}if(!_)throw"invalid length/literal";if(ie<256)e[f++]=ie;else if(ie==256){ee=l,d=null;break}else{var ye=ie-254;if(ie>264){var S=ie-257,ae=yn[S];ye=Je(a,l,(1<<ae)-1)+Dn[S],l+=ae}var fe=h[an(a,l)&Me],be=fe>>>4;if(!fe)throw"invalid distance";l+=fe&15;var V=Pi[be];if(be>3){var ae=bn[be];V+=an(a,l)&(1<<ae)-1,l+=ae}if(l>y){if(s)throw"unexpected EOF";break}r&&i(f+131072);for(var ke=f+ye;f<ke;f+=4)e[f]=e[f-V],e[f+1]=e[f+1-V],e[f+2]=e[f+2-V],e[f+3]=e[f+3-V];f=ke}}t.l=d,t.p=ee,t.b=f,d&&(c=1,t.m=m,t.d=h,t.n=g)}while(!c);return f==e.length?e:Ii(e,0,f)};var Bi=new Ye(0);var zi=function(a){if((a[0]&15)!=8||a[0]>>>4>7||(a[0]<<8|a[1])%31)throw"invalid zlib data";if(a[1]&32)throw"invalid zlib data: preset dictionaries not supported"};function Xt(a,e){return Oi((zi(a),a.subarray(2,-4)),e)}var Fi=typeof TextDecoder<"u"&&new TextDecoder,Hi=0;try{Fi.decode(Bi,{stream:!0}),Hi=1}catch{}var mr=class extends xe.DataTextureLoader{constructor(e){super(e),this.type=xe.HalfFloatType}parse(e){let R=Math.pow(2.7182818,2.2);function U(o,u){let p=0;for(let T=0;T<65536;++T)(T==0||o[T>>3]&1<<(T&7))&&(u[p++]=T);let x=p-1;for(;p<65536;)u[p++]=0;return x}function H(o){for(let u=0;u<16384;u++)o[u]={},o[u].len=0,o[u].lit=0,o[u].p=null}let B={l:0,c:0,lc:0};function _(o,u,p,x,T){for(;p<o;)u=u<<8|or(x,T),p+=8;p-=o,B.l=u>>p&(1<<o)-1,B.c=u,B.lc=p}let G=new Array(59);function q(o){for(let p=0;p<=58;++p)G[p]=0;for(let p=0;p<65537;++p)G[o[p]]+=1;let u=0;for(let p=58;p>0;--p){let x=u+G[p]>>1;G[p]=u,u=x}for(let p=0;p<65537;++p){let x=o[p];x>0&&(o[p]=x|G[x]++<<6)}}function V(o,u,p,x,T,w){let P=u,O=0,z=0;for(;x<=T;x++){if(P.value-u.value>p)return!1;_(6,O,z,o,P);let C=B.l;if(O=B.c,z=B.lc,w[x]=C,C==63){if(P.value-u.value>p)throw new Error("Something wrong with hufUnpackEncTable");_(8,O,z,o,P);let I=B.l+6;if(O=B.c,z=B.lc,x+I>T+1)throw new Error("Something wrong with hufUnpackEncTable");for(;I--;)w[x++]=0;x--}else if(C>=59){let I=C-59+2;if(x+I>T+1)throw new Error("Something wrong with hufUnpackEncTable");for(;I--;)w[x++]=0;x--}}q(w)}function Se(o){return o&63}function Me(o){return o>>6}function ee(o,u,p,x){for(;u<=p;u++){let T=Me(o[u]),w=Se(o[u]);if(T>>w)throw new Error("Invalid table entry");if(w>14){let P=x[T>>w-14];if(P.len)throw new Error("Invalid table entry");if(P.lit++,P.p){let O=P.p;P.p=new Array(P.lit);for(let z=0;z<P.lit-1;++z)P.p[z]=O[z]}else P.p=new Array(1);P.p[P.lit-1]=u}else if(w){let P=0;for(let O=1<<14-w;O>0;O--){let z=x[(T<<14-w)+P];if(z.len||z.p)throw new Error("Invalid table entry");z.len=w,z.lit=u,P++}}}return!0}let ie={c:0,lc:0};function ye(o,u,p,x){o=o<<8|or(p,x),u+=8,ie.c=o,ie.lc=u}let ae={c:0,lc:0};function fe(o,u,p,x,T,w,P,O,z){if(o==u){x<8&&(ye(p,x,T,w),p=ie.c,x=ie.lc),x-=8;let C=p>>x;if(C=new Uint8Array([C])[0],O.value+C>z)return!1;let I=P[O.value-1];for(;C-- >0;)P[O.value++]=I}else if(O.value<z)P[O.value++]=o;else return!1;ae.c=p,ae.lc=x}function be(o){return o&65535}function ke(o){let u=be(o);return u>32767?u-65536:u}let te={a:0,b:0};function Re(o,u){let p=ke(o),T=ke(u),w=p+(T&1)+(T>>1),P=w,O=w-T;te.a=P,te.b=O}function Te(o,u){let p=be(o),x=be(u),T=p-(x>>1)&65535,w=x+T-32768&65535;te.a=w,te.b=T}function _e(o,u,p,x,T,w,P){let O=P<16384,z=p>T?T:p,C=1,I,Z;for(;C<=z;)C<<=1;for(C>>=1,I=C,C>>=1;C>=1;){Z=0;let X=Z+w*(T-I),J=w*C,ne=w*I,K=x*C,Q=x*I,oe,Ce,Pe,je;for(;Z<=X;Z+=ne){let we=Z,ue=Z+x*(p-I);for(;we<=ue;we+=Q){let Le=we+K,Ze=we+J,Fe=Ze+K;O?(Re(o[we+u],o[Ze+u]),oe=te.a,Pe=te.b,Re(o[Le+u],o[Fe+u]),Ce=te.a,je=te.b,Re(oe,Ce),o[we+u]=te.a,o[Le+u]=te.b,Re(Pe,je),o[Ze+u]=te.a,o[Fe+u]=te.b):(Te(o[we+u],o[Ze+u]),oe=te.a,Pe=te.b,Te(o[Le+u],o[Fe+u]),Ce=te.a,je=te.b,Te(oe,Ce),o[we+u]=te.a,o[Le+u]=te.b,Te(Pe,je),o[Ze+u]=te.a,o[Fe+u]=te.b)}if(p&C){let Le=we+J;O?Re(o[we+u],o[Le+u]):Te(o[we+u],o[Le+u]),oe=te.a,o[Le+u]=te.b,o[we+u]=oe}}if(T&C){let we=Z,ue=Z+x*(p-I);for(;we<=ue;we+=Q){let Le=we+K;O?Re(o[we+u],o[Le+u]):Te(o[we+u],o[Le+u]),oe=te.a,o[Le+u]=te.b,o[we+u]=oe}}I=C,C>>=1}return Z}function Be(o,u,p,x,T,w,P,O,z){let C=0,I=0,Z=P,X=Math.trunc(x.value+(T+7)/8);for(;x.value<X;)for(ye(C,I,p,x),C=ie.c,I=ie.lc;I>=14;){let ne=C>>I-14&16383,K=u[ne];if(K.len)I-=K.len,fe(K.lit,w,C,I,p,x,O,z,Z),C=ae.c,I=ae.lc;else{if(!K.p)throw new Error("hufDecode issues");let Q;for(Q=0;Q<K.lit;Q++){let oe=Se(o[K.p[Q]]);for(;I<oe&&x.value<X;)ye(C,I,p,x),C=ie.c,I=ie.lc;if(I>=oe&&Me(o[K.p[Q]])==(C>>I-oe&(1<<oe)-1)){I-=oe,fe(K.p[Q],w,C,I,p,x,O,z,Z),C=ae.c,I=ae.lc;break}}if(Q==K.lit)throw new Error("hufDecode issues")}}let J=8-T&7;for(C>>=J,I-=J;I>0;){let ne=u[C<<14-I&16383];if(ne.len)I-=ne.len,fe(ne.lit,w,C,I,p,x,O,z,Z),C=ae.c,I=ae.lc;else throw new Error("hufDecode issues")}return!0}function rt(o,u,p,x,T,w){let P={value:0},O=p.value,z=Ge(u,p),C=Ge(u,p);p.value+=4;let I=Ge(u,p);if(p.value+=4,z<0||z>=65537||C<0||C>=65537)throw new Error("Something wrong with HUF_ENCSIZE");let Z=new Array(65537),X=new Array(16384);H(X);let J=x-(p.value-O);if(V(o,p,J,z,C,Z),I>8*(x-(p.value-O)))throw new Error("Something wrong with hufUncompress");ee(Z,z,C,X),Be(Z,X,o,p,I,C,w,T,P)}function Dt(o,u,p){for(let x=0;x<p;++x)u[x]=o[u[x]]}function xt(o){for(let u=1;u<o.length;u++){let p=o[u-1]+o[u]-128;o[u]=p}}function wt(o,u){let p=0,x=Math.floor((o.length+1)/2),T=0,w=o.length-1;for(;!(T>w||(u[T++]=o[p++],T>w));)u[T++]=o[x++]}function At(o){let u=o.byteLength,p=new Array,x=0,T=new DataView(o);for(;u>0;){let w=T.getInt8(x++);if(w<0){let P=-w;u-=P+1;for(let O=0;O<P;O++)p.push(T.getUint8(x++))}else{let P=w;u-=2;let O=T.getUint8(x++);for(let z=0;z<P+1;z++)p.push(O)}}return p}function Rt(o,u,p,x,T,w){let P=new DataView(w.buffer),O=p[o.idx[0]].width,z=p[o.idx[0]].height,C=3,I=Math.floor(O/8),Z=Math.ceil(O/8),X=Math.ceil(z/8),J=O-(Z-1)*8,ne=z-(X-1)*8,K={value:0},Q=new Array(C),oe=new Array(C),Ce=new Array(C),Pe=new Array(C),je=new Array(C);for(let ue=0;ue<C;++ue)je[ue]=u[o.idx[ue]],Q[ue]=ue<1?0:Q[ue-1]+Z*X,oe[ue]=new Float32Array(64),Ce[ue]=new Uint16Array(64),Pe[ue]=new Uint16Array(Z*64);for(let ue=0;ue<X;++ue){let Le=8;ue==X-1&&(Le=ne);let Ze=8;for(let pe=0;pe<Z;++pe){pe==Z-1&&(Ze=J);for(let ve=0;ve<C;++ve)Ce[ve].fill(0),Ce[ve][0]=T[Q[ve]++],Pt(K,x,Ce[ve]),Nt(Ce[ve],oe[ve]),Ut(oe[ve]);C==3&&Lt(oe);for(let ve=0;ve<C;++ve)It(oe[ve],Pe[ve],pe*64)}let Fe=0;for(let pe=0;pe<C;++pe){let ve=p[o.idx[pe]].type;for(let nt=8*ue;nt<8*ue+Le;++nt){Fe=je[pe][nt];for(let Gt=0;Gt<I;++Gt){let tt=Gt*64+(nt&7)*8;P.setUint16(Fe+0*2*ve,Pe[pe][tt+0],!0),P.setUint16(Fe+1*2*ve,Pe[pe][tt+1],!0),P.setUint16(Fe+2*2*ve,Pe[pe][tt+2],!0),P.setUint16(Fe+3*2*ve,Pe[pe][tt+3],!0),P.setUint16(Fe+4*2*ve,Pe[pe][tt+4],!0),P.setUint16(Fe+5*2*ve,Pe[pe][tt+5],!0),P.setUint16(Fe+6*2*ve,Pe[pe][tt+6],!0),P.setUint16(Fe+7*2*ve,Pe[pe][tt+7],!0),Fe+=8*2*ve}}if(I!=Z)for(let nt=8*ue;nt<8*ue+Le;++nt){let Gt=je[pe][nt]+8*I*2*ve,tt=I*64+(nt&7)*8;for(let lr=0;lr<Ze;++lr)P.setUint16(Gt+lr*2*ve,Pe[pe][tt+lr],!0)}}}let we=new Uint16Array(O);P=new DataView(w.buffer);for(let ue=0;ue<C;++ue){p[o.idx[ue]].decoded=!0;let Le=p[o.idx[ue]].type;if(p[ue].type==2)for(let Ze=0;Ze<z;++Ze){let Fe=je[ue][Ze];for(let pe=0;pe<O;++pe)we[pe]=P.getUint16(Fe+pe*2*Le,!0);for(let pe=0;pe<O;++pe)P.setFloat32(Fe+pe*2*Le,k(we[pe]),!0)}}}function Pt(o,u,p){let x,T=1;for(;T<64;)x=u[o.value],x==65280?T=64:x>>8==255?T+=x&255:(p[T]=x,T++),o.value++}function Nt(o,u){u[0]=k(o[0]),u[1]=k(o[1]),u[2]=k(o[5]),u[3]=k(o[6]),u[4]=k(o[14]),u[5]=k(o[15]),u[6]=k(o[27]),u[7]=k(o[28]),u[8]=k(o[2]),u[9]=k(o[4]),u[10]=k(o[7]),u[11]=k(o[13]),u[12]=k(o[16]),u[13]=k(o[26]),u[14]=k(o[29]),u[15]=k(o[42]),u[16]=k(o[3]),u[17]=k(o[8]),u[18]=k(o[12]),u[19]=k(o[17]),u[20]=k(o[25]),u[21]=k(o[30]),u[22]=k(o[41]),u[23]=k(o[43]),u[24]=k(o[9]),u[25]=k(o[11]),u[26]=k(o[18]),u[27]=k(o[24]),u[28]=k(o[31]),u[29]=k(o[40]),u[30]=k(o[44]),u[31]=k(o[53]),u[32]=k(o[10]),u[33]=k(o[19]),u[34]=k(o[23]),u[35]=k(o[32]),u[36]=k(o[39]),u[37]=k(o[45]),u[38]=k(o[52]),u[39]=k(o[54]),u[40]=k(o[20]),u[41]=k(o[22]),u[42]=k(o[33]),u[43]=k(o[38]),u[44]=k(o[46]),u[45]=k(o[51]),u[46]=k(o[55]),u[47]=k(o[60]),u[48]=k(o[21]),u[49]=k(o[34]),u[50]=k(o[37]),u[51]=k(o[47]),u[52]=k(o[50]),u[53]=k(o[56]),u[54]=k(o[59]),u[55]=k(o[61]),u[56]=k(o[35]),u[57]=k(o[36]),u[58]=k(o[48]),u[59]=k(o[49]),u[60]=k(o[57]),u[61]=k(o[58]),u[62]=k(o[62]),u[63]=k(o[63])}function Ut(o){let u=.5*Math.cos(.7853975),p=.5*Math.cos(3.14159/16),x=.5*Math.cos(3.14159/8),T=.5*Math.cos(3*3.14159/16),w=.5*Math.cos(5*3.14159/16),P=.5*Math.cos(3*3.14159/8),O=.5*Math.cos(7*3.14159/16),z=new Array(4),C=new Array(4),I=new Array(4),Z=new Array(4);for(let X=0;X<8;++X){let J=X*8;z[0]=x*o[J+2],z[1]=P*o[J+2],z[2]=x*o[J+6],z[3]=P*o[J+6],C[0]=p*o[J+1]+T*o[J+3]+w*o[J+5]+O*o[J+7],C[1]=T*o[J+1]-O*o[J+3]-p*o[J+5]-w*o[J+7],C[2]=w*o[J+1]-p*o[J+3]+O*o[J+5]+T*o[J+7],C[3]=O*o[J+1]-w*o[J+3]+T*o[J+5]-p*o[J+7],I[0]=u*(o[J+0]+o[J+4]),I[3]=u*(o[J+0]-o[J+4]),I[1]=z[0]+z[3],I[2]=z[1]-z[2],Z[0]=I[0]+I[1],Z[1]=I[3]+I[2],Z[2]=I[3]-I[2],Z[3]=I[0]-I[1],o[J+0]=Z[0]+C[0],o[J+1]=Z[1]+C[1],o[J+2]=Z[2]+C[2],o[J+3]=Z[3]+C[3],o[J+4]=Z[3]-C[3],o[J+5]=Z[2]-C[2],o[J+6]=Z[1]-C[1],o[J+7]=Z[0]-C[0]}for(let X=0;X<8;++X)z[0]=x*o[16+X],z[1]=P*o[16+X],z[2]=x*o[48+X],z[3]=P*o[48+X],C[0]=p*o[8+X]+T*o[24+X]+w*o[40+X]+O*o[56+X],C[1]=T*o[8+X]-O*o[24+X]-p*o[40+X]-w*o[56+X],C[2]=w*o[8+X]-p*o[24+X]+O*o[40+X]+T*o[56+X],C[3]=O*o[8+X]-w*o[24+X]+T*o[40+X]-p*o[56+X],I[0]=u*(o[X]+o[32+X]),I[3]=u*(o[X]-o[32+X]),I[1]=z[0]+z[3],I[2]=z[1]-z[2],Z[0]=I[0]+I[1],Z[1]=I[3]+I[2],Z[2]=I[3]-I[2],Z[3]=I[0]-I[1],o[0+X]=Z[0]+C[0],o[8+X]=Z[1]+C[1],o[16+X]=Z[2]+C[2],o[24+X]=Z[3]+C[3],o[32+X]=Z[3]-C[3],o[40+X]=Z[2]-C[2],o[48+X]=Z[1]-C[1],o[56+X]=Z[0]-C[0]}function Lt(o){for(let u=0;u<64;++u){let p=o[0][u],x=o[1][u],T=o[2][u];o[0][u]=p+1.5747*T,o[1][u]=p-.1873*x-.4682*T,o[2][u]=p+1.8556*x}}function It(o,u,p){for(let x=0;x<64;++x)u[p+x]=xe.DataUtils.toHalfFloat(Ot(o[x]))}function Ot(o){return o<=1?Math.sign(o)*Math.pow(Math.abs(o),2.2):Math.sign(o)*Math.pow(R,Math.abs(o)-1)}function St(o){return new DataView(o.array.buffer,o.offset.value,o.size)}function Bt(o){let u=o.viewer.buffer.slice(o.offset.value,o.offset.value+o.size),p=new Uint8Array(At(u)),x=new Uint8Array(p.length);return xt(p),wt(p,x),new DataView(x.buffer)}function ht(o){let u=o.array.slice(o.offset.value,o.offset.value+o.size),p=Xt(u),x=new Uint8Array(p.length);return xt(p),wt(p,x),new DataView(x.buffer)}function zt(o){let u=o.viewer,p={value:o.offset.value},x=new Uint16Array(o.width*o.scanlineBlockSize*(o.channels*o.type)),T=new Uint8Array(8192),w=0,P=new Array(o.channels);for(let ne=0;ne<o.channels;ne++)P[ne]={},P[ne].start=w,P[ne].end=P[ne].start,P[ne].nx=o.width,P[ne].ny=o.lines,P[ne].size=o.type,w+=P[ne].nx*P[ne].ny*P[ne].size;let O=Qe(u,p),z=Qe(u,p);if(z>=8192)throw new Error("Something is wrong with PIZ_COMPRESSION BITMAP_SIZE");if(O<=z)for(let ne=0;ne<z-O+1;ne++)T[ne+O]=lt(u,p);let C=new Uint16Array(65536),I=U(T,C),Z=Ge(u,p);rt(o.array,u,p,Z,x,w);for(let ne=0;ne<o.channels;++ne){let K=P[ne];for(let Q=0;Q<P[ne].size;++Q)_e(x,K.start+Q,K.nx,K.size,K.ny,K.nx*K.size,I)}Dt(C,x,w);let X=0,J=new Uint8Array(x.buffer.byteLength);for(let ne=0;ne<o.lines;ne++)for(let K=0;K<o.channels;K++){let Q=P[K],oe=Q.nx*Q.size,Ce=new Uint8Array(x.buffer,Q.end*2,oe*2);J.set(Ce,X),X+=oe*2,Q.end+=oe}return new DataView(J.buffer)}function Ft(o){let u=o.array.slice(o.offset.value,o.offset.value+o.size),p=Xt(u),x=o.lines*o.channels*o.width,T=o.type==1?new Uint16Array(x):new Uint32Array(x),w=0,P=0,O=new Array(4);for(let z=0;z<o.lines;z++)for(let C=0;C<o.channels;C++){let I=0;switch(o.type){case 1:O[0]=w,O[1]=O[0]+o.width,w=O[1]+o.width;for(let Z=0;Z<o.width;++Z){let X=p[O[0]++]<<8|p[O[1]++];I+=X,T[P]=I,P++}break;case 2:O[0]=w,O[1]=O[0]+o.width,O[2]=O[1]+o.width,w=O[2]+o.width;for(let Z=0;Z<o.width;++Z){let X=p[O[0]++]<<24|p[O[1]++]<<16|p[O[2]++]<<8;I+=X,T[P]=I,P++}break}}return new DataView(T.buffer)}function at(o){let u=o.viewer,p={value:o.offset.value},x=new Uint8Array(o.width*o.lines*(o.channels*o.type*2)),T={version:ze(u,p),unknownUncompressedSize:ze(u,p),unknownCompressedSize:ze(u,p),acCompressedSize:ze(u,p),dcCompressedSize:ze(u,p),rleCompressedSize:ze(u,p),rleUncompressedSize:ze(u,p),rleRawSize:ze(u,p),totalAcUncompressedCount:ze(u,p),totalDcUncompressedCount:ze(u,p),acCompression:ze(u,p)};if(T.version<2)throw new Error("EXRLoader.parse: "+kt.compression+" version "+T.version+" is unsupported");let w=new Array,P=Qe(u,p)-2;for(;P>0;){let K=et(u.buffer,p),Q=lt(u,p),oe=Q>>2&3,Ce=(Q>>4)-1,Pe=new Int8Array([Ce])[0],je=lt(u,p);w.push({name:K,index:Pe,type:je,compression:oe}),P-=K.length+3}let O=kt.channels,z=new Array(o.channels);for(let K=0;K<o.channels;++K){let Q=z[K]={},oe=O[K];Q.name=oe.name,Q.compression=0,Q.decoded=!1,Q.type=oe.pixelType,Q.pLinear=oe.pLinear,Q.width=o.width,Q.height=o.lines}let C={idx:new Array(3)};for(let K=0;K<o.channels;++K){let Q=z[K];for(let oe=0;oe<w.length;++oe){let Ce=w[oe];Q.name==Ce.name&&(Q.compression=Ce.compression,Ce.index>=0&&(C.idx[Ce.index]=K),Q.offset=K)}}let I,Z,X;if(T.acCompressedSize>0)switch(T.acCompression){case 0:I=new Uint16Array(T.totalAcUncompressedCount),rt(o.array,u,p,T.acCompressedSize,I,T.totalAcUncompressedCount);break;case 1:let K=o.array.slice(p.value,p.value+T.totalAcUncompressedCount),Q=Xt(K);I=new Uint16Array(Q.buffer),p.value+=T.totalAcUncompressedCount;break}if(T.dcCompressedSize>0){let K={array:o.array,offset:p,size:T.dcCompressedSize};Z=new Uint16Array(ht(K).buffer),p.value+=T.dcCompressedSize}if(T.rleRawSize>0){let K=o.array.slice(p.value,p.value+T.rleCompressedSize),Q=Xt(K);X=At(Q.buffer),p.value+=T.rleCompressedSize}let J=0,ne=new Array(z.length);for(let K=0;K<ne.length;++K)ne[K]=new Array;for(let K=0;K<o.lines;++K)for(let Q=0;Q<z.length;++Q)ne[Q].push(J),J+=z[Q].width*o.type*2;Rt(C,ne,z,I,Z,x);for(let K=0;K<z.length;++K){let Q=z[K];if(!Q.decoded)switch(Q.compression){case 2:let oe=0,Ce=0;for(let Pe=0;Pe<o.lines;++Pe){let je=ne[K][oe];for(let we=0;we<Q.width;++we){for(let ue=0;ue<2*Q.type;++ue)x[je++]=X[Ce+ue*Q.width*Q.height];Ce++}oe++}break;case 1:default:throw new Error("EXRLoader.parse: unsupported channel compression")}}return new DataView(x.buffer)}function et(o,u){let p=new Uint8Array(o),x=0;for(;p[u.value+x]!=0;)x+=1;let T=new TextDecoder().decode(p.slice(u.value,u.value+x));return u.value=u.value+x+1,T}function dt(o,u,p){let x=new TextDecoder().decode(new Uint8Array(o).slice(u.value,u.value+p));return u.value=u.value+p,x}function pt(o,u){let p=mt(o,u),x=Ge(o,u);return[p,x]}function Dr(o,u){let p=Ge(o,u),x=Ge(o,u);return[p,x]}function mt(o,u){let p=o.getInt32(u.value,!0);return u.value=u.value+4,p}function Ge(o,u){let p=o.getUint32(u.value,!0);return u.value=u.value+4,p}function or(o,u){let p=o[u.value];return u.value=u.value+1,p}function lt(o,u){let p=o.getUint8(u.value);return u.value=u.value+1,p}let ze=function(o,u){let p;return"getBigInt64"in DataView.prototype?p=Number(o.getBigInt64(u.value,!0)):p=o.getUint32(u.value+4,!0)+Number(o.getUint32(u.value,!0)<<32),u.value+=8,p};function Ee(o,u){let p=o.getFloat32(u.value,!0);return u.value+=4,p}function vt(o,u){return xe.DataUtils.toHalfFloat(Ee(o,u))}function k(o){let u=(o&31744)>>10,p=o&1023;return(o>>15?-1:1)*(u?u===31?p?NaN:1/0:Math.pow(2,u-15)*(1+p/1024):6103515625e-14*(p/1024))}function Qe(o,u){let p=o.getUint16(u.value,!0);return u.value+=2,p}function kn(o,u){return k(Qe(o,u))}function Gn(o,u,p,x){let T=p.value,w=[];for(;p.value<T+x-1;){let P=et(u,p),O=mt(o,p),z=lt(o,p);p.value+=3;let C=mt(o,p),I=mt(o,p);w.push({name:P,pixelType:O,pLinear:z,xSampling:C,ySampling:I})}return p.value+=1,w}function Vn(o,u){let p=Ee(o,u),x=Ee(o,u),T=Ee(o,u),w=Ee(o,u),P=Ee(o,u),O=Ee(o,u),z=Ee(o,u),C=Ee(o,u);return{redX:p,redY:x,greenX:T,greenY:w,blueX:P,blueY:O,whiteX:z,whiteY:C}}function Wn(o,u){let p=["NO_COMPRESSION","RLE_COMPRESSION","ZIPS_COMPRESSION","ZIP_COMPRESSION","PIZ_COMPRESSION","PXR24_COMPRESSION","B44_COMPRESSION","B44A_COMPRESSION","DWAA_COMPRESSION","DWAB_COMPRESSION"],x=lt(o,u);return p[x]}function jn(o,u){let p=Ge(o,u),x=Ge(o,u),T=Ge(o,u),w=Ge(o,u);return{xMin:p,yMin:x,xMax:T,yMax:w}}function Xn(o,u){let p=["INCREASING_Y"],x=lt(o,u);return p[x]}function _n(o,u){let p=Ee(o,u),x=Ee(o,u);return[p,x]}function Zn(o,u){let p=Ee(o,u),x=Ee(o,u),T=Ee(o,u);return[p,x,T]}function Kn(o,u,p,x,T){if(x==="string"||x==="stringvector"||x==="iccProfile")return dt(u,p,T);if(x==="chlist")return Gn(o,u,p,T);if(x==="chromaticities")return Vn(o,p);if(x==="compression")return Wn(o,p);if(x==="box2i")return jn(o,p);if(x==="lineOrder")return Xn(o,p);if(x==="float")return Ee(o,p);if(x==="v2f")return _n(o,p);if(x==="v3f")return Zn(o,p);if(x==="int")return mt(o,p);if(x==="rational")return pt(o,p);if(x==="timecode")return Dr(o,p);if(x==="preview")return p.value+=T,"skipped";p.value+=T}function Yn(o,u,p){let x={};if(o.getUint32(0,!0)!=20000630)throw new Error("THREE.EXRLoader: Provided file doesn't appear to be in OpenEXR format.");x.version=o.getUint8(4);let T=o.getUint8(5);x.spec={singleTile:!!(T&2),longName:!!(T&4),deepFormat:!!(T&8),multiPart:!!(T&16)},p.value=8;let w=!0;for(;w;){let P=et(u,p);if(P==0)w=!1;else{let O=et(u,p),z=Ge(o,p),C=Kn(o,u,p,O,z);C===void 0?console.warn(`THREE.EXRLoader: Skipped unknown header attribute type '${O}'.`):x[P]=C}}if(T&-5)throw console.error("THREE.EXRHeader:",x),new Error("THREE.EXRLoader: Provided file is currently unsupported.");return x}function qn(o,u,p,x,T){let w={size:0,viewer:u,array:p,offset:x,width:o.dataWindow.xMax-o.dataWindow.xMin+1,height:o.dataWindow.yMax-o.dataWindow.yMin+1,channels:o.channels.length,bytesPerLine:null,lines:null,inputSize:null,type:o.channels[0].pixelType,uncompress:null,getter:null,format:null,colorSpace:xe.LinearSRGBColorSpace};switch(o.compression){case"NO_COMPRESSION":w.lines=1,w.uncompress=St;break;case"RLE_COMPRESSION":w.lines=1,w.uncompress=Bt;break;case"ZIPS_COMPRESSION":w.lines=1,w.uncompress=ht;break;case"ZIP_COMPRESSION":w.lines=16,w.uncompress=ht;break;case"PIZ_COMPRESSION":w.lines=32,w.uncompress=zt;break;case"PXR24_COMPRESSION":w.lines=16,w.uncompress=Ft;break;case"DWAA_COMPRESSION":w.lines=32,w.uncompress=at;break;case"DWAB_COMPRESSION":w.lines=256,w.uncompress=at;break;default:throw new Error("EXRLoader.parse: "+o.compression+" is unsupported")}if(w.scanlineBlockSize=w.lines,w.type==1)switch(T){case xe.FloatType:w.getter=kn,w.inputSize=2;break;case xe.HalfFloatType:w.getter=Qe,w.inputSize=2;break}else if(w.type==2)switch(T){case xe.FloatType:w.getter=Ee,w.inputSize=4;break;case xe.HalfFloatType:w.getter=vt,w.inputSize=4}else throw new Error("EXRLoader.parse: unsupported pixelType "+w.type+" for "+o.compression+".");w.blockCount=(o.dataWindow.yMax+1)/w.scanlineBlockSize;for(let O=0;O<w.blockCount;O++)ze(u,x);w.outputChannels=w.channels==3?4:w.channels;let P=w.width*w.height*w.outputChannels;switch(T){case xe.FloatType:w.byteArray=new Float32Array(P),w.channels<w.outputChannels&&w.byteArray.fill(1,0,P);break;case xe.HalfFloatType:w.byteArray=new Uint16Array(P),w.channels<w.outputChannels&&w.byteArray.fill(15360,0,P);break;default:console.error("THREE.EXRLoader: unsupported type: ",T);break}return w.bytesPerLine=w.width*w.inputSize*w.channels,w.outputChannels==4?(w.format=xe.RGBAFormat,w.colorSpace=xe.LinearSRGBColorSpace):(w.format=xe.RedFormat,w.colorSpace=xe.NoColorSpace),w}let ar=new DataView(e),Qn=new Uint8Array(e),Ht={value:0},kt=Yn(ar,e,Ht),ce=qn(kt,ar,Qn,Ht,this.type),pn={value:0},Jn={R:0,G:1,B:2,A:3,Y:0};for(let o=0;o<ce.height/ce.scanlineBlockSize;o++){let u=Ge(ar,Ht);ce.size=Ge(ar,Ht),ce.lines=u+ce.scanlineBlockSize>ce.height?ce.height-u:ce.scanlineBlockSize;let x=ce.size<ce.lines*ce.bytesPerLine?ce.uncompress(ce):St(ce);Ht.value+=ce.size;for(let T=0;T<ce.scanlineBlockSize;T++){let w=T+o*ce.scanlineBlockSize;if(w>=ce.height)break;for(let P=0;P<ce.channels;P++){let O=Jn[kt.channels[P].name];for(let z=0;z<ce.width;z++){pn.value=(T*(ce.channels*ce.width)+P*ce.width+z)*ce.inputSize;let C=(ce.height-1-w)*(ce.width*ce.outputChannels)+z*ce.outputChannels+O;ce.byteArray[C]=ce.getter(x,pn)}}}}return{header:kt,width:ce.width,height:ce.height,data:ce.byteArray,format:ce.format,colorSpace:ce.colorSpace,type:this.type}}setDataType(e){return this.type=e,this}load(e,t,n,r){function s(i,c){i.colorSpace=c.colorSpace,i.minFilter=xe.LinearFilter,i.magFilter=xe.LinearFilter,i.generateMipmaps=!1,i.flipY=!1,t&&t(i,c)}return super.load(e,s,n,r)}};var $e=Ae(ge(),1);var qe={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`};var _t=Ae(ge(),1);var st=Ae(ge(),1),Ue=class{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}},Gi=new st.OrthographicCamera(-1,1,1,-1,0,1),un=class extends st.BufferGeometry{constructor(){super(),this.setAttribute("position",new st.Float32BufferAttribute([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new st.Float32BufferAttribute([0,2,0,0,2,0],2))}},Vi=new un,Ve=class{constructor(e){this._mesh=new st.Mesh(Vi,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,Gi)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}};var Mt=class extends Ue{constructor(e,t){super(),this.textureID=t!==void 0?t:"tDiffuse",e instanceof _t.ShaderMaterial?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=_t.UniformsUtils.clone(e.uniforms),this.material=new _t.ShaderMaterial({name:e.name!==void 0?e.name:"unspecified",defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this.fsQuad=new Ve(this.material)}render(e,t,n){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=n.texture),this.fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this.fsQuad.render(e))}dispose(){this.material.dispose(),this.fsQuad.dispose()}};var Zt=class extends Ue{constructor(e,t){super(),this.scene=e,this.camera=t,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,t,n){let r=e.getContext(),s=e.state;s.buffers.color.setMask(!1),s.buffers.depth.setMask(!1),s.buffers.color.setLocked(!0),s.buffers.depth.setLocked(!0);let i,c;this.inverse?(i=0,c=1):(i=1,c=0),s.buffers.stencil.setTest(!0),s.buffers.stencil.setOp(r.REPLACE,r.REPLACE,r.REPLACE),s.buffers.stencil.setFunc(r.ALWAYS,i,4294967295),s.buffers.stencil.setClear(c),s.buffers.stencil.setLocked(!0),e.setRenderTarget(n),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(t),this.clear&&e.clear(),e.render(this.scene,this.camera),s.buffers.color.setLocked(!1),s.buffers.depth.setLocked(!1),s.buffers.color.setMask(!0),s.buffers.depth.setMask(!0),s.buffers.stencil.setLocked(!1),s.buffers.stencil.setFunc(r.EQUAL,1,4294967295),s.buffers.stencil.setOp(r.KEEP,r.KEEP,r.KEEP),s.buffers.stencil.setLocked(!0)}},vr=class extends Ue{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}};var gr=class{constructor(e,t){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),t===void 0){let n=e.getSize(new $e.Vector2);this._width=n.width,this._height=n.height,t=new $e.WebGLRenderTarget(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:$e.HalfFloatType}),t.texture.name="EffectComposer.rt1"}else this._width=t.width,this._height=t.height;this.renderTarget1=t,this.renderTarget2=t.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new Mt(qe),this.copyPass.material.blending=$e.NoBlending,this.clock=new $e.Clock}swapBuffers(){let e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,t){this.passes.splice(t,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){let t=this.passes.indexOf(e);t!==-1&&this.passes.splice(t,1)}isLastEnabledPass(e){for(let t=e+1;t<this.passes.length;t++)if(this.passes[t].enabled)return!1;return!0}render(e){e===void 0&&(e=this.clock.getDelta());let t=this.renderer.getRenderTarget(),n=!1;for(let r=0,s=this.passes.length;r<s;r++){let i=this.passes[r];if(i.enabled!==!1){if(i.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(r),i.render(this.renderer,this.writeBuffer,this.readBuffer,e,n),i.needsSwap){if(n){let c=this.renderer.getContext(),l=this.renderer.state.buffers.stencil;l.setFunc(c.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),l.setFunc(c.EQUAL,1,4294967295)}this.swapBuffers()}Zt!==void 0&&(i instanceof Zt?n=!0:i instanceof vr&&(n=!1))}}this.renderer.setRenderTarget(t)}reset(e){if(e===void 0){let t=this.renderer.getSize(new $e.Vector2);this._pixelRatio=this.renderer.getPixelRatio(),this._width=t.width,this._height=t.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,t){this._width=e,this._height=t;let n=this._width*this._pixelRatio,r=this._height*this._pixelRatio;this.renderTarget1.setSize(n,r),this.renderTarget2.setSize(n,r);for(let s=0;s<this.passes.length;s++)this.passes[s].setSize(n,r)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}};var Nn=Ae(ge(),1);var xr=class extends Ue{constructor(e,t,n=null,r=null,s=null){super(),this.scene=e,this.camera=t,this.overrideMaterial=n,this.clearColor=r,this.clearAlpha=s,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this._oldClearColor=new Nn.Color}render(e,t,n){let r=e.autoClear;e.autoClear=!1;let s,i;this.overrideMaterial!==null&&(i=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor)),this.clearAlpha!==null&&(s=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:n),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(s),this.overrideMaterial!==null&&(this.scene.overrideMaterial=i),e.autoClear=r}};var W=Ae(ge(),1);var We=Ae(ge(),1),Kt={name:"GTAOShader",defines:{PERSPECTIVE_CAMERA:1,SAMPLES:16,NORMAL_VECTOR_TYPE:1,DEPTH_SWIZZLING:"x",SCREEN_SPACE_RADIUS:0,SCREEN_SPACE_RADIUS_SCALE:100,SCENE_CLIP_BOX:0},uniforms:{tNormal:{value:null},tDepth:{value:null},tNoise:{value:null},resolution:{value:new We.Vector2},cameraNear:{value:null},cameraFar:{value:null},cameraProjectionMatrix:{value:new We.Matrix4},cameraProjectionMatrixInverse:{value:new We.Matrix4},cameraWorldMatrix:{value:new We.Matrix4},radius:{value:.25},distanceExponent:{value:1},thickness:{value:1},distanceFallOff:{value:1},scale:{value:1},sceneBoxMin:{value:new We.Vector3(-1,-1,-1)},sceneBoxMax:{value:new We.Vector3(1,1,1)}},vertexShader:`

		varying vec2 vUv;

		void main() {
			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
		}`,fragmentShader:`
		varying vec2 vUv;
		uniform highp sampler2D tNormal;
		uniform highp sampler2D tDepth;
		uniform sampler2D tNoise;
		uniform vec2 resolution;
		uniform float cameraNear;
		uniform float cameraFar;
		uniform mat4 cameraProjectionMatrix;
		uniform mat4 cameraProjectionMatrixInverse;		
		uniform mat4 cameraWorldMatrix;
		uniform float radius;
		uniform float distanceExponent;
		uniform float thickness;
		uniform float distanceFallOff;
		uniform float scale;
		#if SCENE_CLIP_BOX == 1
			uniform vec3 sceneBoxMin;
			uniform vec3 sceneBoxMax;
		#endif
		
		#include <common>
		#include <packing>

		#ifndef FRAGMENT_OUTPUT
		#define FRAGMENT_OUTPUT vec4(vec3(ao), 1.)
		#endif

		vec3 getViewPosition(const in vec2 screenPosition, const in float depth) {
			vec4 clipSpacePosition = vec4(vec3(screenPosition, depth) * 2.0 - 1.0, 1.0);
			vec4 viewSpacePosition = cameraProjectionMatrixInverse * clipSpacePosition;
			return viewSpacePosition.xyz / viewSpacePosition.w;
		}

		float getDepth(const vec2 uv) {  
			return textureLod(tDepth, uv.xy, 0.0).DEPTH_SWIZZLING;
		}

		float fetchDepth(const ivec2 uv) {   
			return texelFetch(tDepth, uv.xy, 0).DEPTH_SWIZZLING;
		}

		float getViewZ(const in float depth) {
			#if PERSPECTIVE_CAMERA == 1
				return perspectiveDepthToViewZ(depth, cameraNear, cameraFar);
			#else
				return orthographicDepthToViewZ(depth, cameraNear, cameraFar);
			#endif
		}

		vec3 computeNormalFromDepth(const vec2 uv) {
			vec2 size = vec2(textureSize(tDepth, 0));
			ivec2 p = ivec2(uv * size);
			float c0 = fetchDepth(p);
			float l2 = fetchDepth(p - ivec2(2, 0));
			float l1 = fetchDepth(p - ivec2(1, 0));
			float r1 = fetchDepth(p + ivec2(1, 0));
			float r2 = fetchDepth(p + ivec2(2, 0));
			float b2 = fetchDepth(p - ivec2(0, 2));
			float b1 = fetchDepth(p - ivec2(0, 1));
			float t1 = fetchDepth(p + ivec2(0, 1));
			float t2 = fetchDepth(p + ivec2(0, 2));
			float dl = abs((2.0 * l1 - l2) - c0);
			float dr = abs((2.0 * r1 - r2) - c0);
			float db = abs((2.0 * b1 - b2) - c0);
			float dt = abs((2.0 * t1 - t2) - c0);
			vec3 ce = getViewPosition(uv, c0).xyz;
			vec3 dpdx = (dl < dr) ? ce - getViewPosition((uv - vec2(1.0 / size.x, 0.0)), l1).xyz : -ce + getViewPosition((uv + vec2(1.0 / size.x, 0.0)), r1).xyz;
			vec3 dpdy = (db < dt) ? ce - getViewPosition((uv - vec2(0.0, 1.0 / size.y)), b1).xyz : -ce + getViewPosition((uv + vec2(0.0, 1.0 / size.y)), t1).xyz;
			return normalize(cross(dpdx, dpdy));
		}

		vec3 getViewNormal(const vec2 uv) {
			#if NORMAL_VECTOR_TYPE == 2
				return normalize(textureLod(tNormal, uv, 0.).rgb);
			#elif NORMAL_VECTOR_TYPE == 1
				return unpackRGBToNormal(textureLod(tNormal, uv, 0.).rgb);
			#else
				return computeNormalFromDepth(uv);
			#endif
		}

		vec3 getSceneUvAndDepth(vec3 sampleViewPos) {
			vec4 sampleClipPos = cameraProjectionMatrix * vec4(sampleViewPos, 1.);
			vec2 sampleUv = sampleClipPos.xy / sampleClipPos.w * 0.5 + 0.5;
			float sampleSceneDepth = getDepth(sampleUv);
			return vec3(sampleUv, sampleSceneDepth);
		}
		
		void main() {
			float depth = getDepth(vUv.xy);
			if (depth >= 1.0) {
				discard;
				return;
			}
			vec3 viewPos = getViewPosition(vUv, depth);
			vec3 viewNormal = getViewNormal(vUv);

			float radiusToUse = radius;
			float distanceFalloffToUse = thickness;
			#if SCREEN_SPACE_RADIUS == 1
				float radiusScale = getViewPosition(vec2(0.5 + float(SCREEN_SPACE_RADIUS_SCALE) / resolution.x, 0.0), depth).x;
				radiusToUse *= radiusScale;
				distanceFalloffToUse *= radiusScale;
			#endif

			#if SCENE_CLIP_BOX == 1
				vec3 worldPos = (cameraWorldMatrix * vec4(viewPos, 1.0)).xyz;
				float boxDistance = length(max(vec3(0.0), max(sceneBoxMin - worldPos, worldPos - sceneBoxMax)));
				if (boxDistance > radiusToUse) {
					discard;
					return;
				}
			#endif
			
			vec2 noiseResolution = vec2(textureSize(tNoise, 0));
			vec2 noiseUv = vUv * resolution / noiseResolution;
			vec4 noiseTexel = textureLod(tNoise, noiseUv, 0.0);
			vec3 randomVec = noiseTexel.xyz * 2.0 - 1.0;
			vec3 tangent = normalize(vec3(randomVec.xy, 0.));
			vec3 bitangent = vec3(-tangent.y, tangent.x, 0.);
			mat3 kernelMatrix = mat3(tangent, bitangent, vec3(0., 0., 1.));

			const int DIRECTIONS = SAMPLES < 30 ? 3 : 5;
			const int STEPS = (SAMPLES + DIRECTIONS - 1) / DIRECTIONS;
			float ao = 0.0, totalWeight = 0.0;
			for (int i = 0; i < DIRECTIONS; ++i) {
				
				float angle = float(i) / float(DIRECTIONS) * PI;
				vec4 sampleDir = vec4(cos(angle), sin(angle), 0., 0.5 + 0.5 * noiseTexel.w); 
				sampleDir.xyz = normalize(kernelMatrix * sampleDir.xyz);

				vec3 viewDir = normalize(-viewPos.xyz);
				vec3 sliceBitangent = normalize(cross(sampleDir.xyz, viewDir));
				vec3 sliceTangent = cross(sliceBitangent, viewDir);
				vec3 normalInSlice = normalize(viewNormal - sliceBitangent * dot(viewNormal, sliceBitangent));
				
				vec3 tangentToNormalInSlice = cross(normalInSlice, sliceBitangent);
				vec2 cosHorizons = vec2(dot(viewDir, tangentToNormalInSlice), dot(viewDir, -tangentToNormalInSlice));
				
				for (int j = 0; j < STEPS; ++j) {
					vec3 sampleViewOffset = sampleDir.xyz * radiusToUse * sampleDir.w * pow(float(j + 1) / float(STEPS), distanceExponent);	

					vec3 sampleSceneUvDepth = getSceneUvAndDepth(viewPos + sampleViewOffset);
					vec3 sampleSceneViewPos = getViewPosition(sampleSceneUvDepth.xy, sampleSceneUvDepth.z);
					vec3 viewDelta = sampleSceneViewPos - viewPos;
					if (abs(viewDelta.z) < thickness) {
						float sampleCosHorizon = dot(viewDir, normalize(viewDelta));
						cosHorizons.x += max(0., (sampleCosHorizon - cosHorizons.x) * mix(1., 2. / float(j + 2), distanceFallOff));
					}		

					sampleSceneUvDepth = getSceneUvAndDepth(viewPos - sampleViewOffset);
					sampleSceneViewPos = getViewPosition(sampleSceneUvDepth.xy, sampleSceneUvDepth.z);
					viewDelta = sampleSceneViewPos - viewPos;
					if (abs(viewDelta.z) < thickness) {
						float sampleCosHorizon = dot(viewDir, normalize(viewDelta));
						cosHorizons.y += max(0., (sampleCosHorizon - cosHorizons.y) * mix(1., 2. / float(j + 2), distanceFallOff));
					}
				}

				vec2 sinHorizons = sqrt(1. - cosHorizons * cosHorizons);
				float nx = dot(normalInSlice, sliceTangent);
				float ny = dot(normalInSlice, viewDir);
				float nxb = 1. / 2. * (acos(cosHorizons.y) - acos(cosHorizons.x) + sinHorizons.x * cosHorizons.x - sinHorizons.y * cosHorizons.y);
				float nyb = 1. / 2. * (2. - cosHorizons.x * cosHorizons.x - cosHorizons.y * cosHorizons.y);
				float occlusion = nx * nxb + ny * nyb;
				ao += occlusion;
			}

			ao = clamp(ao / float(DIRECTIONS), 0., 1.);		
		#if SCENE_CLIP_BOX == 1
			ao = mix(ao, 1., smoothstep(0., radiusToUse, boxDistance));
		#endif
			ao = pow(ao, scale);

			gl_FragColor = FRAGMENT_OUTPUT;
		}`},Yt={name:"GTAODepthShader",defines:{PERSPECTIVE_CAMERA:1},uniforms:{tDepth:{value:null},cameraNear:{value:null},cameraFar:{value:null}},vertexShader:`
		varying vec2 vUv;

		void main() {
			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
		}`,fragmentShader:`
		uniform sampler2D tDepth;
		uniform float cameraNear;
		uniform float cameraFar;
		varying vec2 vUv;

		#include <packing>

		float getLinearDepth( const in vec2 screenPosition ) {
			#if PERSPECTIVE_CAMERA == 1
				float fragCoordZ = texture2D( tDepth, screenPosition ).x;
				float viewZ = perspectiveDepthToViewZ( fragCoordZ, cameraNear, cameraFar );
				return viewZToOrthographicDepth( viewZ, cameraNear, cameraFar );
			#else
				return texture2D( tDepth, screenPosition ).x;
			#endif
		}

		void main() {
			float depth = getLinearDepth( vUv );
			gl_FragColor = vec4( vec3( 1.0 - depth ), 1.0 );

		}`},wr={name:"GTAOBlendShader",uniforms:{tDiffuse:{value:null},intensity:{value:1}},vertexShader:`
		varying vec2 vUv;

		void main() {
			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
		}`,fragmentShader:`
		uniform float intensity;
		uniform sampler2D tDiffuse;
		varying vec2 vUv;

		void main() {
			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = vec4(mix(vec3(1.), texel.rgb, intensity), texel.a);
		}`};function Un(a=5){let e=Math.floor(a)%2===0?Math.floor(a)+1:Math.floor(a),t=Wi(e),n=t.length,r=new Uint8Array(n*4);for(let i=0;i<n;++i){let c=t[i],l=2*Math.PI*c/n,f=new We.Vector3(Math.cos(l),Math.sin(l),0).normalize();r[i*4]=(f.x*.5+.5)*255,r[i*4+1]=(f.y*.5+.5)*255,r[i*4+2]=127,r[i*4+3]=255}let s=new We.DataTexture(r,e,e);return s.wrapS=We.RepeatWrapping,s.wrapT=We.RepeatWrapping,s.needsUpdate=!0,s}function Wi(a){let e=Math.floor(a)%2===0?Math.floor(a)+1:Math.floor(a),t=e*e,n=Array(t).fill(0),r=Math.floor(e/2),s=e-1;for(let i=1;i<=t;){if(r===-1&&s===e?(s=e-2,r=0):(s===e&&(s=0),r<0&&(r=e-1)),n[r*e+s]!==0){s-=2,r++;continue}else n[r*e+s]=i++;s++,r--}return n}var yt=Ae(ge(),1),qt={name:"PoissonDenoiseShader",defines:{SAMPLES:16,SAMPLE_VECTORS:fn(16,2,1),NORMAL_VECTOR_TYPE:1,DEPTH_VALUE_SOURCE:0},uniforms:{tDiffuse:{value:null},tNormal:{value:null},tDepth:{value:null},tNoise:{value:null},resolution:{value:new yt.Vector2},cameraProjectionMatrixInverse:{value:new yt.Matrix4},lumaPhi:{value:5},depthPhi:{value:5},normalPhi:{value:5},radius:{value:4},index:{value:0}},vertexShader:`

		varying vec2 vUv;

		void main() {
			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
		}`,fragmentShader:`

		varying vec2 vUv;

		uniform sampler2D tDiffuse;
		uniform sampler2D tNormal;
		uniform sampler2D tDepth;
		uniform sampler2D tNoise;
		uniform vec2 resolution;
		uniform mat4 cameraProjectionMatrixInverse;
		uniform float lumaPhi;
		uniform float depthPhi;
		uniform float normalPhi;
		uniform float radius;
		uniform int index;
		
		#include <common>
		#include <packing>

		#ifndef SAMPLE_LUMINANCE
		#define SAMPLE_LUMINANCE dot(vec3(0.2125, 0.7154, 0.0721), a)
		#endif

		#ifndef FRAGMENT_OUTPUT
		#define FRAGMENT_OUTPUT vec4(denoised, 1.)
		#endif

		float getLuminance(const in vec3 a) {
			return SAMPLE_LUMINANCE;
		}

		const vec3 poissonDisk[SAMPLES] = SAMPLE_VECTORS;

		vec3 getViewPosition(const in vec2 screenPosition, const in float depth) {
			vec4 clipSpacePosition = vec4(vec3(screenPosition, depth) * 2.0 - 1.0, 1.0);
			vec4 viewSpacePosition = cameraProjectionMatrixInverse * clipSpacePosition;
			return viewSpacePosition.xyz / viewSpacePosition.w;
		}
		
		float getDepth(const vec2 uv) {
		#if DEPTH_VALUE_SOURCE == 1    
			return textureLod(tDepth, uv.xy, 0.0).a;
		#else
			return textureLod(tDepth, uv.xy, 0.0).r;
		#endif
		}

		float fetchDepth(const ivec2 uv) {
			#if DEPTH_VALUE_SOURCE == 1    
				return texelFetch(tDepth, uv.xy, 0).a;
			#else
				return texelFetch(tDepth, uv.xy, 0).r;
			#endif
		}

		vec3 computeNormalFromDepth(const vec2 uv) {
			vec2 size = vec2(textureSize(tDepth, 0));
			ivec2 p = ivec2(uv * size);
			float c0 = fetchDepth(p);
			float l2 = fetchDepth(p - ivec2(2, 0));
			float l1 = fetchDepth(p - ivec2(1, 0));
			float r1 = fetchDepth(p + ivec2(1, 0));
			float r2 = fetchDepth(p + ivec2(2, 0));
			float b2 = fetchDepth(p - ivec2(0, 2));
			float b1 = fetchDepth(p - ivec2(0, 1));
			float t1 = fetchDepth(p + ivec2(0, 1));
			float t2 = fetchDepth(p + ivec2(0, 2));
			float dl = abs((2.0 * l1 - l2) - c0);
			float dr = abs((2.0 * r1 - r2) - c0);
			float db = abs((2.0 * b1 - b2) - c0);
			float dt = abs((2.0 * t1 - t2) - c0);
			vec3 ce = getViewPosition(uv, c0).xyz;
			vec3 dpdx = (dl < dr) ?  ce - getViewPosition((uv - vec2(1.0 / size.x, 0.0)), l1).xyz
									: -ce + getViewPosition((uv + vec2(1.0 / size.x, 0.0)), r1).xyz;
			vec3 dpdy = (db < dt) ?  ce - getViewPosition((uv - vec2(0.0, 1.0 / size.y)), b1).xyz
									: -ce + getViewPosition((uv + vec2(0.0, 1.0 / size.y)), t1).xyz;
			return normalize(cross(dpdx, dpdy));
		}

		vec3 getViewNormal(const vec2 uv) {
		#if NORMAL_VECTOR_TYPE == 2
			return normalize(textureLod(tNormal, uv, 0.).rgb);
		#elif NORMAL_VECTOR_TYPE == 1
			return unpackRGBToNormal(textureLod(tNormal, uv, 0.).rgb);
		#else
			return computeNormalFromDepth(uv);
		#endif
		}

		void denoiseSample(in vec3 center, in vec3 viewNormal, in vec3 viewPos, in vec2 sampleUv, inout vec3 denoised, inout float totalWeight) {
			vec4 sampleTexel = textureLod(tDiffuse, sampleUv, 0.0);
			float sampleDepth = getDepth(sampleUv);
			vec3 sampleNormal = getViewNormal(sampleUv);
			vec3 neighborColor = sampleTexel.rgb;
			vec3 viewPosSample = getViewPosition(sampleUv, sampleDepth);
			
			float normalDiff = dot(viewNormal, sampleNormal);
			float normalSimilarity = pow(max(normalDiff, 0.), normalPhi);
			float lumaDiff = abs(getLuminance(neighborColor) - getLuminance(center));
			float lumaSimilarity = max(1.0 - lumaDiff / lumaPhi, 0.0);
			float depthDiff = abs(dot(viewPos - viewPosSample, viewNormal));
			float depthSimilarity = max(1. - depthDiff / depthPhi, 0.);
			float w = lumaSimilarity * depthSimilarity * normalSimilarity;
		
			denoised += w * neighborColor;
			totalWeight += w;
		}
		
		void main() {
			float depth = getDepth(vUv.xy);	
			vec3 viewNormal = getViewNormal(vUv);	
			if (depth == 1. || dot(viewNormal, viewNormal) == 0.) {
				discard;
				return;
			}
			vec4 texel = textureLod(tDiffuse, vUv, 0.0);
			vec3 center = texel.rgb;
			vec3 viewPos = getViewPosition(vUv, depth);

			vec2 noiseResolution = vec2(textureSize(tNoise, 0));
			vec2 noiseUv = vUv * resolution / noiseResolution;
			vec4 noiseTexel = textureLod(tNoise, noiseUv, 0.0);
      		vec2 noiseVec = vec2(sin(noiseTexel[index % 4] * 2. * PI), cos(noiseTexel[index % 4] * 2. * PI));
    		mat2 rotationMatrix = mat2(noiseVec.x, -noiseVec.y, noiseVec.x, noiseVec.y);
		
			float totalWeight = 1.0;
			vec3 denoised = texel.rgb;
			for (int i = 0; i < SAMPLES; i++) {
				vec3 sampleDir = poissonDisk[i];
				vec2 offset = rotationMatrix * (sampleDir.xy * (1. + sampleDir.z * (radius - 1.)) / resolution);
				vec2 sampleUv = vUv + offset;
				denoiseSample(center, viewNormal, viewPos, sampleUv, denoised, totalWeight);
			}
		
			if (totalWeight > 0.) { 
				denoised /= totalWeight;
			}
			gl_FragColor = FRAGMENT_OUTPUT;
		}`};function fn(a,e,t){let n=ji(a,e,t),r="vec3[SAMPLES](";for(let s=0;s<a;s++){let i=n[s];r+=`vec3(${i.x}, ${i.y}, ${i.z})${s<a-1?",":")"}`}return r}function ji(a,e,t){let n=[];for(let r=0;r<a;r++){let s=2*Math.PI*e*r/a,i=Math.pow(r/(a-1),t);n.push(new yt.Vector3(Math.cos(s),Math.sin(s),i))}return n}var bt=class{constructor(e=Math){this.grad3=[[1,1,0],[-1,1,0],[1,-1,0],[-1,-1,0],[1,0,1],[-1,0,1],[1,0,-1],[-1,0,-1],[0,1,1],[0,-1,1],[0,1,-1],[0,-1,-1]],this.grad4=[[0,1,1,1],[0,1,1,-1],[0,1,-1,1],[0,1,-1,-1],[0,-1,1,1],[0,-1,1,-1],[0,-1,-1,1],[0,-1,-1,-1],[1,0,1,1],[1,0,1,-1],[1,0,-1,1],[1,0,-1,-1],[-1,0,1,1],[-1,0,1,-1],[-1,0,-1,1],[-1,0,-1,-1],[1,1,0,1],[1,1,0,-1],[1,-1,0,1],[1,-1,0,-1],[-1,1,0,1],[-1,1,0,-1],[-1,-1,0,1],[-1,-1,0,-1],[1,1,1,0],[1,1,-1,0],[1,-1,1,0],[1,-1,-1,0],[-1,1,1,0],[-1,1,-1,0],[-1,-1,1,0],[-1,-1,-1,0]],this.p=[];for(let t=0;t<256;t++)this.p[t]=Math.floor(e.random()*256);this.perm=[];for(let t=0;t<512;t++)this.perm[t]=this.p[t&255];this.simplex=[[0,1,2,3],[0,1,3,2],[0,0,0,0],[0,2,3,1],[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,2,3,0],[0,2,1,3],[0,0,0,0],[0,3,1,2],[0,3,2,1],[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,3,2,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,2,0,3],[0,0,0,0],[1,3,0,2],[0,0,0,0],[0,0,0,0],[0,0,0,0],[2,3,0,1],[2,3,1,0],[1,0,2,3],[1,0,3,2],[0,0,0,0],[0,0,0,0],[0,0,0,0],[2,0,3,1],[0,0,0,0],[2,1,3,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[2,0,1,3],[0,0,0,0],[0,0,0,0],[0,0,0,0],[3,0,1,2],[3,0,2,1],[0,0,0,0],[3,1,2,0],[2,1,0,3],[0,0,0,0],[0,0,0,0],[0,0,0,0],[3,1,0,2],[0,0,0,0],[3,2,0,1],[3,2,1,0]]}dot(e,t,n){return e[0]*t+e[1]*n}dot3(e,t,n,r){return e[0]*t+e[1]*n+e[2]*r}dot4(e,t,n,r,s){return e[0]*t+e[1]*n+e[2]*r+e[3]*s}noise(e,t){let n,r,s,i=.5*(Math.sqrt(3)-1),c=(e+t)*i,l=Math.floor(e+c),f=Math.floor(t+c),d=(3-Math.sqrt(3))/6,h=(l+f)*d,m=l-h,g=f-h,y=e-m,M=t-g,A,b;y>M?(A=1,b=0):(A=0,b=1);let E=y-A+d,N=M-b+d,D=y-1+2*d,L=M-1+2*d,j=l&255,F=f&255,S=this.perm[j+this.perm[F]]%12,R=this.perm[j+A+this.perm[F+b]]%12,U=this.perm[j+1+this.perm[F+1]]%12,H=.5-y*y-M*M;H<0?n=0:(H*=H,n=H*H*this.dot(this.grad3[S],y,M));let B=.5-E*E-N*N;B<0?r=0:(B*=B,r=B*B*this.dot(this.grad3[R],E,N));let _=.5-D*D-L*L;return _<0?s=0:(_*=_,s=_*_*this.dot(this.grad3[U],D,L)),70*(n+r+s)}noise3d(e,t,n){let r,s,i,c,f=(e+t+n)*.3333333333333333,d=Math.floor(e+f),h=Math.floor(t+f),m=Math.floor(n+f),g=1/6,y=(d+h+m)*g,M=d-y,A=h-y,b=m-y,E=e-M,N=t-A,D=n-b,L,j,F,S,R,U;E>=N?N>=D?(L=1,j=0,F=0,S=1,R=1,U=0):E>=D?(L=1,j=0,F=0,S=1,R=0,U=1):(L=0,j=0,F=1,S=1,R=0,U=1):N<D?(L=0,j=0,F=1,S=0,R=1,U=1):E<D?(L=0,j=1,F=0,S=0,R=1,U=1):(L=0,j=1,F=0,S=1,R=1,U=0);let H=E-L+g,B=N-j+g,_=D-F+g,G=E-S+2*g,q=N-R+2*g,V=D-U+2*g,Se=E-1+3*g,Me=N-1+3*g,ee=D-1+3*g,ie=d&255,ye=h&255,ae=m&255,fe=this.perm[ie+this.perm[ye+this.perm[ae]]]%12,be=this.perm[ie+L+this.perm[ye+j+this.perm[ae+F]]]%12,ke=this.perm[ie+S+this.perm[ye+R+this.perm[ae+U]]]%12,te=this.perm[ie+1+this.perm[ye+1+this.perm[ae+1]]]%12,Re=.6-E*E-N*N-D*D;Re<0?r=0:(Re*=Re,r=Re*Re*this.dot3(this.grad3[fe],E,N,D));let Te=.6-H*H-B*B-_*_;Te<0?s=0:(Te*=Te,s=Te*Te*this.dot3(this.grad3[be],H,B,_));let _e=.6-G*G-q*q-V*V;_e<0?i=0:(_e*=_e,i=_e*_e*this.dot3(this.grad3[ke],G,q,V));let Be=.6-Se*Se-Me*Me-ee*ee;return Be<0?c=0:(Be*=Be,c=Be*Be*this.dot3(this.grad3[te],Se,Me,ee)),32*(r+s+i+c)}noise4d(e,t,n,r){let s=this.grad4,i=this.simplex,c=this.perm,l=(Math.sqrt(5)-1)/4,f=(5-Math.sqrt(5))/20,d,h,m,g,y,M=(e+t+n+r)*l,A=Math.floor(e+M),b=Math.floor(t+M),E=Math.floor(n+M),N=Math.floor(r+M),D=(A+b+E+N)*f,L=A-D,j=b-D,F=E-D,S=N-D,R=e-L,U=t-j,H=n-F,B=r-S,_=R>U?32:0,G=R>H?16:0,q=U>H?8:0,V=R>B?4:0,Se=U>B?2:0,Me=H>B?1:0,ee=_+G+q+V+Se+Me,ie=i[ee][0]>=3?1:0,ye=i[ee][1]>=3?1:0,ae=i[ee][2]>=3?1:0,fe=i[ee][3]>=3?1:0,be=i[ee][0]>=2?1:0,ke=i[ee][1]>=2?1:0,te=i[ee][2]>=2?1:0,Re=i[ee][3]>=2?1:0,Te=i[ee][0]>=1?1:0,_e=i[ee][1]>=1?1:0,Be=i[ee][2]>=1?1:0,rt=i[ee][3]>=1?1:0,Dt=R-ie+f,xt=U-ye+f,wt=H-ae+f,At=B-fe+f,Rt=R-be+2*f,Pt=U-ke+2*f,Nt=H-te+2*f,Ut=B-Re+2*f,Lt=R-Te+3*f,It=U-_e+3*f,Ot=H-Be+3*f,St=B-rt+3*f,Bt=R-1+4*f,ht=U-1+4*f,zt=H-1+4*f,Ft=B-1+4*f,at=A&255,et=b&255,dt=E&255,pt=N&255,Dr=c[at+c[et+c[dt+c[pt]]]]%32,mt=c[at+ie+c[et+ye+c[dt+ae+c[pt+fe]]]]%32,Ge=c[at+be+c[et+ke+c[dt+te+c[pt+Re]]]]%32,or=c[at+Te+c[et+_e+c[dt+Be+c[pt+rt]]]]%32,lt=c[at+1+c[et+1+c[dt+1+c[pt+1]]]]%32,ze=.6-R*R-U*U-H*H-B*B;ze<0?d=0:(ze*=ze,d=ze*ze*this.dot4(s[Dr],R,U,H,B));let Ee=.6-Dt*Dt-xt*xt-wt*wt-At*At;Ee<0?h=0:(Ee*=Ee,h=Ee*Ee*this.dot4(s[mt],Dt,xt,wt,At));let vt=.6-Rt*Rt-Pt*Pt-Nt*Nt-Ut*Ut;vt<0?m=0:(vt*=vt,m=vt*vt*this.dot4(s[Ge],Rt,Pt,Nt,Ut));let k=.6-Lt*Lt-It*It-Ot*Ot-St*St;k<0?g=0:(k*=k,g=k*k*this.dot4(s[or],Lt,It,Ot,St));let Qe=.6-Bt*Bt-ht*ht-zt*zt-Ft*Ft;return Qe<0?y=0:(Qe*=Qe,y=Qe*Qe*this.dot4(s[lt],Bt,ht,zt,Ft)),27*(d+h+m+g+y)}};var Qt=class a extends Ue{constructor(e,t,n,r,s,i,c){super(),this.width=n!==void 0?n:512,this.height=r!==void 0?r:512,this.clear=!0,this.camera=t,this.scene=e,this.output=0,this._renderGBuffer=!0,this._visibilityCache=new Map,this.blendIntensity=1,this.pdRings=2,this.pdRadiusExponent=2,this.pdSamples=16,this.gtaoNoiseTexture=Un(),this.pdNoiseTexture=this.generateNoise(),this.gtaoRenderTarget=new W.WebGLRenderTarget(this.width,this.height,{type:W.HalfFloatType}),this.pdRenderTarget=this.gtaoRenderTarget.clone(),this.gtaoMaterial=new W.ShaderMaterial({defines:Object.assign({},Kt.defines),uniforms:W.UniformsUtils.clone(Kt.uniforms),vertexShader:Kt.vertexShader,fragmentShader:Kt.fragmentShader,blending:W.NoBlending,depthTest:!1,depthWrite:!1}),this.gtaoMaterial.definesPERSPECTIVE_CAMERA=this.camera.isPerspectiveCamera?1:0,this.gtaoMaterial.uniforms.tNoise.value=this.gtaoNoiseTexture,this.gtaoMaterial.uniforms.resolution.value.set(this.width,this.height),this.gtaoMaterial.uniforms.cameraNear.value=this.camera.near,this.gtaoMaterial.uniforms.cameraFar.value=this.camera.far,this.normalMaterial=new W.MeshNormalMaterial,this.normalMaterial.blending=W.NoBlending,this.pdMaterial=new W.ShaderMaterial({defines:Object.assign({},qt.defines),uniforms:W.UniformsUtils.clone(qt.uniforms),vertexShader:qt.vertexShader,fragmentShader:qt.fragmentShader,depthTest:!1,depthWrite:!1}),this.pdMaterial.uniforms.tDiffuse.value=this.gtaoRenderTarget.texture,this.pdMaterial.uniforms.tNoise.value=this.pdNoiseTexture,this.pdMaterial.uniforms.resolution.value.set(this.width,this.height),this.pdMaterial.uniforms.lumaPhi.value=10,this.pdMaterial.uniforms.depthPhi.value=2,this.pdMaterial.uniforms.normalPhi.value=3,this.pdMaterial.uniforms.radius.value=8,this.depthRenderMaterial=new W.ShaderMaterial({defines:Object.assign({},Yt.defines),uniforms:W.UniformsUtils.clone(Yt.uniforms),vertexShader:Yt.vertexShader,fragmentShader:Yt.fragmentShader,blending:W.NoBlending}),this.depthRenderMaterial.uniforms.cameraNear.value=this.camera.near,this.depthRenderMaterial.uniforms.cameraFar.value=this.camera.far,this.copyMaterial=new W.ShaderMaterial({uniforms:W.UniformsUtils.clone(qe.uniforms),vertexShader:qe.vertexShader,fragmentShader:qe.fragmentShader,transparent:!0,depthTest:!1,depthWrite:!1,blendSrc:W.DstColorFactor,blendDst:W.ZeroFactor,blendEquation:W.AddEquation,blendSrcAlpha:W.DstAlphaFactor,blendDstAlpha:W.ZeroFactor,blendEquationAlpha:W.AddEquation}),this.blendMaterial=new W.ShaderMaterial({uniforms:W.UniformsUtils.clone(wr.uniforms),vertexShader:wr.vertexShader,fragmentShader:wr.fragmentShader,transparent:!0,depthTest:!1,depthWrite:!1,blending:W.CustomBlending,blendSrc:W.DstColorFactor,blendDst:W.ZeroFactor,blendEquation:W.AddEquation,blendSrcAlpha:W.DstAlphaFactor,blendDstAlpha:W.ZeroFactor,blendEquationAlpha:W.AddEquation}),this.fsQuad=new Ve(null),this.originalClearColor=new W.Color,this.setGBuffer(s?s.depthTexture:void 0,s?s.normalTexture:void 0),i!==void 0&&this.updateGtaoMaterial(i),c!==void 0&&this.updatePdMaterial(c)}dispose(){this.gtaoNoiseTexture.dispose(),this.pdNoiseTexture.dispose(),this.normalRenderTarget.dispose(),this.gtaoRenderTarget.dispose(),this.pdRenderTarget.dispose(),this.normalMaterial.dispose(),this.pdMaterial.dispose(),this.copyMaterial.dispose(),this.depthRenderMaterial.dispose(),this.fsQuad.dispose()}setGBuffer(e,t){e!==void 0?(this.depthTexture=e,this.normalTexture=t,this._renderGBuffer=!1):(this.depthTexture=new W.DepthTexture,this.depthTexture.format=W.DepthStencilFormat,this.depthTexture.type=W.UnsignedInt248Type,this.normalRenderTarget=new W.WebGLRenderTarget(this.width,this.height,{minFilter:W.NearestFilter,magFilter:W.NearestFilter,type:W.HalfFloatType,depthTexture:this.depthTexture}),this.normalTexture=this.normalRenderTarget.texture,this._renderGBuffer=!0);let n=this.normalTexture?1:0,r=this.depthTexture===this.normalTexture?"w":"x";this.gtaoMaterial.defines.NORMAL_VECTOR_TYPE=n,this.gtaoMaterial.defines.DEPTH_SWIZZLING=r,this.gtaoMaterial.uniforms.tNormal.value=this.normalTexture,this.gtaoMaterial.uniforms.tDepth.value=this.depthTexture,this.pdMaterial.defines.NORMAL_VECTOR_TYPE=n,this.pdMaterial.defines.DEPTH_SWIZZLING=r,this.pdMaterial.uniforms.tNormal.value=this.normalTexture,this.pdMaterial.uniforms.tDepth.value=this.depthTexture,this.depthRenderMaterial.uniforms.tDepth.value=this.normalRenderTarget.depthTexture}setSceneClipBox(e){e?(this.gtaoMaterial.needsUpdate=this.gtaoMaterial.defines.SCENE_CLIP_BOX!==1,this.gtaoMaterial.defines.SCENE_CLIP_BOX=1,this.gtaoMaterial.uniforms.sceneBoxMin.value.copy(e.min),this.gtaoMaterial.uniforms.sceneBoxMax.value.copy(e.max)):(this.gtaoMaterial.needsUpdate=this.gtaoMaterial.defines.SCENE_CLIP_BOX===0,this.gtaoMaterial.defines.SCENE_CLIP_BOX=0)}updateGtaoMaterial(e){e.radius!==void 0&&(this.gtaoMaterial.uniforms.radius.value=e.radius),e.distanceExponent!==void 0&&(this.gtaoMaterial.uniforms.distanceExponent.value=e.distanceExponent),e.thickness!==void 0&&(this.gtaoMaterial.uniforms.thickness.value=e.thickness),e.distanceFallOff!==void 0&&(this.gtaoMaterial.uniforms.distanceFallOff.value=e.distanceFallOff,this.gtaoMaterial.needsUpdate=!0),e.scale!==void 0&&(this.gtaoMaterial.uniforms.scale.value=e.scale),e.samples!==void 0&&e.samples!==this.gtaoMaterial.defines.SAMPLES&&(this.gtaoMaterial.defines.SAMPLES=e.samples,this.gtaoMaterial.needsUpdate=!0),e.screenSpaceRadius!==void 0&&(e.screenSpaceRadius?1:0)!==this.gtaoMaterial.defines.SCREEN_SPACE_RADIUS&&(this.gtaoMaterial.defines.SCREEN_SPACE_RADIUS=e.screenSpaceRadius?1:0,this.gtaoMaterial.needsUpdate=!0)}updatePdMaterial(e){let t=!1;e.lumaPhi!==void 0&&(this.pdMaterial.uniforms.lumaPhi.value=e.lumaPhi),e.depthPhi!==void 0&&(this.pdMaterial.uniforms.depthPhi.value=e.depthPhi),e.normalPhi!==void 0&&(this.pdMaterial.uniforms.normalPhi.value=e.normalPhi),e.radius!==void 0&&e.radius!==this.radius&&(this.pdMaterial.uniforms.radius.value=e.radius),e.radiusExponent!==void 0&&e.radiusExponent!==this.pdRadiusExponent&&(this.pdRadiusExponent=e.radiusExponent,t=!0),e.rings!==void 0&&e.rings!==this.pdRings&&(this.pdRings=e.rings,t=!0),e.samples!==void 0&&e.samples!==this.pdSamples&&(this.pdSamples=e.samples,t=!0),t&&(this.pdMaterial.defines.SAMPLES=this.pdSamples,this.pdMaterial.defines.SAMPLE_VECTORS=fn(this.pdSamples,this.pdRings,this.pdRadiusExponent),this.pdMaterial.needsUpdate=!0)}render(e,t,n){switch(this._renderGBuffer&&(this.overrideVisibility(),this.renderOverride(e,this.normalMaterial,this.normalRenderTarget,7829503,1),this.restoreVisibility()),this.gtaoMaterial.uniforms.cameraNear.value=this.camera.near,this.gtaoMaterial.uniforms.cameraFar.value=this.camera.far,this.gtaoMaterial.uniforms.cameraProjectionMatrix.value.copy(this.camera.projectionMatrix),this.gtaoMaterial.uniforms.cameraProjectionMatrixInverse.value.copy(this.camera.projectionMatrixInverse),this.gtaoMaterial.uniforms.cameraWorldMatrix.value.copy(this.camera.matrixWorld),this.renderPass(e,this.gtaoMaterial,this.gtaoRenderTarget,16777215,1),this.pdMaterial.uniforms.cameraProjectionMatrixInverse.value.copy(this.camera.projectionMatrixInverse),this.renderPass(e,this.pdMaterial,this.pdRenderTarget,16777215,1),this.output){case a.OUTPUT.Diffuse:this.copyMaterial.uniforms.tDiffuse.value=n.texture,this.copyMaterial.blending=W.NoBlending,this.renderPass(e,this.copyMaterial,this.renderToScreen?null:t);break;case a.OUTPUT.AO:this.copyMaterial.uniforms.tDiffuse.value=this.gtaoRenderTarget.texture,this.copyMaterial.blending=W.NoBlending,this.renderPass(e,this.copyMaterial,this.renderToScreen?null:t);break;case a.OUTPUT.Denoise:this.copyMaterial.uniforms.tDiffuse.value=this.pdRenderTarget.texture,this.copyMaterial.blending=W.NoBlending,this.renderPass(e,this.copyMaterial,this.renderToScreen?null:t);break;case a.OUTPUT.Depth:this.depthRenderMaterial.uniforms.cameraNear.value=this.camera.near,this.depthRenderMaterial.uniforms.cameraFar.value=this.camera.far,this.renderPass(e,this.depthRenderMaterial,this.renderToScreen?null:t);break;case a.OUTPUT.Normal:this.copyMaterial.uniforms.tDiffuse.value=this.normalRenderTarget.texture,this.copyMaterial.blending=W.NoBlending,this.renderPass(e,this.copyMaterial,this.renderToScreen?null:t);break;case a.OUTPUT.Default:this.copyMaterial.uniforms.tDiffuse.value=n.texture,this.copyMaterial.blending=W.NoBlending,this.renderPass(e,this.copyMaterial,this.renderToScreen?null:t),this.blendMaterial.uniforms.intensity.value=this.blendIntensity,this.blendMaterial.uniforms.tDiffuse.value=this.pdRenderTarget.texture,this.renderPass(e,this.blendMaterial,this.renderToScreen?null:t);break;default:console.warn("THREE.GTAOPass: Unknown output type.")}}renderPass(e,t,n,r,s){e.getClearColor(this.originalClearColor);let i=e.getClearAlpha(),c=e.autoClear;e.setRenderTarget(n),e.autoClear=!1,r!=null&&(e.setClearColor(r),e.setClearAlpha(s||0),e.clear()),this.fsQuad.material=t,this.fsQuad.render(e),e.autoClear=c,e.setClearColor(this.originalClearColor),e.setClearAlpha(i)}renderOverride(e,t,n,r,s){e.getClearColor(this.originalClearColor);let i=e.getClearAlpha(),c=e.autoClear;e.setRenderTarget(n),e.autoClear=!1,r=t.clearColor||r,s=t.clearAlpha||s,r!=null&&(e.setClearColor(r),e.setClearAlpha(s||0),e.clear()),this.scene.overrideMaterial=t,e.render(this.scene,this.camera),this.scene.overrideMaterial=null,e.autoClear=c,e.setClearColor(this.originalClearColor),e.setClearAlpha(i)}setSize(e,t){this.width=e,this.height=t,this.gtaoRenderTarget.setSize(e,t),this.normalRenderTarget.setSize(e,t),this.pdRenderTarget.setSize(e,t),this.gtaoMaterial.uniforms.resolution.value.set(e,t),this.gtaoMaterial.uniforms.cameraProjectionMatrix.value.copy(this.camera.projectionMatrix),this.gtaoMaterial.uniforms.cameraProjectionMatrixInverse.value.copy(this.camera.projectionMatrixInverse),this.pdMaterial.uniforms.resolution.value.set(e,t),this.pdMaterial.uniforms.cameraProjectionMatrixInverse.value.copy(this.camera.projectionMatrixInverse)}overrideVisibility(){let e=this.scene,t=this._visibilityCache;e.traverse(function(n){t.set(n,n.visible),(n.isPoints||n.isLine)&&(n.visible=!1)})}restoreVisibility(){let e=this.scene,t=this._visibilityCache;e.traverse(function(n){let r=t.get(n);n.visible=r}),t.clear()}generateNoise(e=64){let t=new bt,n=e*e*4,r=new Uint8Array(n);for(let i=0;i<e;i++)for(let c=0;c<e;c++){let l=i,f=c;r[(i*e+c)*4]=(t.noise(l,f)*.5+.5)*255,r[(i*e+c)*4+1]=(t.noise(l+e,f)*.5+.5)*255,r[(i*e+c)*4+2]=(t.noise(l,f+e)*.5+.5)*255,r[(i*e+c)*4+3]=(t.noise(l+e,f+e)*.5+.5)*255}let s=new W.DataTexture(r,e,e,W.RGBAFormat,W.UnsignedByteType);return s.wrapS=W.RepeatWrapping,s.wrapT=W.RepeatWrapping,s.needsUpdate=!0,s}};Qt.OUTPUT={Default:0,Diffuse:1,Depth:2,Normal:3,AO:4,Denoise:5};var Y=Ae(ge(),1);var Jt=Ae(ge(),1),$t={name:"SAOShader",defines:{NUM_SAMPLES:7,NUM_RINGS:4,DIFFUSE_TEXTURE:0,PERSPECTIVE_CAMERA:1},uniforms:{tDepth:{value:null},tDiffuse:{value:null},tNormal:{value:null},size:{value:new Jt.Vector2(512,512)},cameraNear:{value:1},cameraFar:{value:100},cameraProjectionMatrix:{value:new Jt.Matrix4},cameraInverseProjectionMatrix:{value:new Jt.Matrix4},scale:{value:1},intensity:{value:.1},bias:{value:.5},minResolution:{value:0},kernelRadius:{value:100},randomSeed:{value:0}},vertexShader:`

		varying vec2 vUv;

		void main() {
			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
		}`,fragmentShader:`
		#include <common>

		varying vec2 vUv;

		#if DIFFUSE_TEXTURE == 1
		uniform sampler2D tDiffuse;
		#endif

		uniform highp sampler2D tDepth;
		uniform highp sampler2D tNormal;

		uniform float cameraNear;
		uniform float cameraFar;
		uniform mat4 cameraProjectionMatrix;
		uniform mat4 cameraInverseProjectionMatrix;

		uniform float scale;
		uniform float intensity;
		uniform float bias;
		uniform float kernelRadius;
		uniform float minResolution;
		uniform vec2 size;
		uniform float randomSeed;

		// RGBA depth

		#include <packing>

		vec4 getDefaultColor( const in vec2 screenPosition ) {
			#if DIFFUSE_TEXTURE == 1
			return texture2D( tDiffuse, vUv );
			#else
			return vec4( 1.0 );
			#endif
		}

		float getDepth( const in vec2 screenPosition ) {
			return texture2D( tDepth, screenPosition ).x;
		}

		float getViewZ( const in float depth ) {
			#if PERSPECTIVE_CAMERA == 1
			return perspectiveDepthToViewZ( depth, cameraNear, cameraFar );
			#else
			return orthographicDepthToViewZ( depth, cameraNear, cameraFar );
			#endif
		}

		vec3 getViewPosition( const in vec2 screenPosition, const in float depth, const in float viewZ ) {
			float clipW = cameraProjectionMatrix[2][3] * viewZ + cameraProjectionMatrix[3][3];
			vec4 clipPosition = vec4( ( vec3( screenPosition, depth ) - 0.5 ) * 2.0, 1.0 );
			clipPosition *= clipW; // unprojection.

			return ( cameraInverseProjectionMatrix * clipPosition ).xyz;
		}

		vec3 getViewNormal( const in vec3 viewPosition, const in vec2 screenPosition ) {
			return unpackRGBToNormal( texture2D( tNormal, screenPosition ).xyz );
		}

		float scaleDividedByCameraFar;
		float minResolutionMultipliedByCameraFar;

		float getOcclusion( const in vec3 centerViewPosition, const in vec3 centerViewNormal, const in vec3 sampleViewPosition ) {
			vec3 viewDelta = sampleViewPosition - centerViewPosition;
			float viewDistance = length( viewDelta );
			float scaledScreenDistance = scaleDividedByCameraFar * viewDistance;

			return max(0.0, (dot(centerViewNormal, viewDelta) - minResolutionMultipliedByCameraFar) / scaledScreenDistance - bias) / (1.0 + pow2( scaledScreenDistance ) );
		}

		// moving costly divides into consts
		const float ANGLE_STEP = PI2 * float( NUM_RINGS ) / float( NUM_SAMPLES );
		const float INV_NUM_SAMPLES = 1.0 / float( NUM_SAMPLES );

		float getAmbientOcclusion( const in vec3 centerViewPosition ) {
			// precompute some variables require in getOcclusion.
			scaleDividedByCameraFar = scale / cameraFar;
			minResolutionMultipliedByCameraFar = minResolution * cameraFar;
			vec3 centerViewNormal = getViewNormal( centerViewPosition, vUv );

			// jsfiddle that shows sample pattern: https://jsfiddle.net/a16ff1p7/
			float angle = rand( vUv + randomSeed ) * PI2;
			vec2 radius = vec2( kernelRadius * INV_NUM_SAMPLES ) / size;
			vec2 radiusStep = radius;

			float occlusionSum = 0.0;
			float weightSum = 0.0;

			for( int i = 0; i < NUM_SAMPLES; i ++ ) {
				vec2 sampleUv = vUv + vec2( cos( angle ), sin( angle ) ) * radius;
				radius += radiusStep;
				angle += ANGLE_STEP;

				float sampleDepth = getDepth( sampleUv );
				if( sampleDepth >= ( 1.0 - EPSILON ) ) {
					continue;
				}

				float sampleViewZ = getViewZ( sampleDepth );
				vec3 sampleViewPosition = getViewPosition( sampleUv, sampleDepth, sampleViewZ );
				occlusionSum += getOcclusion( centerViewPosition, centerViewNormal, sampleViewPosition );
				weightSum += 1.0;
			}

			if( weightSum == 0.0 ) discard;

			return occlusionSum * ( intensity / weightSum );
		}

		void main() {
			float centerDepth = getDepth( vUv );
			if( centerDepth >= ( 1.0 - EPSILON ) ) {
				discard;
			}

			float centerViewZ = getViewZ( centerDepth );
			vec3 viewPosition = getViewPosition( vUv, centerDepth, centerViewZ );

			float ambientOcclusion = getAmbientOcclusion( viewPosition );

			gl_FragColor = getDefaultColor( vUv );
			gl_FragColor.xyz *=  1.0 - ambientOcclusion;
		}`};var hn=Ae(ge(),1),ot={name:"DepthLimitedBlurShader",defines:{KERNEL_RADIUS:4,DEPTH_PACKING:1,PERSPECTIVE_CAMERA:1},uniforms:{tDiffuse:{value:null},size:{value:new hn.Vector2(512,512)},sampleUvOffsets:{value:[new hn.Vector2(0,0)]},sampleWeights:{value:[1]},tDepth:{value:null},cameraNear:{value:10},cameraFar:{value:1e3},depthCutoff:{value:10}},vertexShader:`

		#include <common>

		uniform vec2 size;

		varying vec2 vUv;
		varying vec2 vInvSize;

		void main() {
			vUv = uv;
			vInvSize = 1.0 / size;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
		}`,fragmentShader:`

		#include <common>
		#include <packing>

		uniform sampler2D tDiffuse;
		uniform sampler2D tDepth;

		uniform float cameraNear;
		uniform float cameraFar;
		uniform float depthCutoff;

		uniform vec2 sampleUvOffsets[ KERNEL_RADIUS + 1 ];
		uniform float sampleWeights[ KERNEL_RADIUS + 1 ];

		varying vec2 vUv;
		varying vec2 vInvSize;

		float getDepth( const in vec2 screenPosition ) {
			#if DEPTH_PACKING == 1
			return unpackRGBAToDepth( texture2D( tDepth, screenPosition ) );
			#else
			return texture2D( tDepth, screenPosition ).x;
			#endif
		}

		float getViewZ( const in float depth ) {
			#if PERSPECTIVE_CAMERA == 1
			return perspectiveDepthToViewZ( depth, cameraNear, cameraFar );
			#else
			return orthographicDepthToViewZ( depth, cameraNear, cameraFar );
			#endif
		}

		void main() {
			float depth = getDepth( vUv );
			if( depth >= ( 1.0 - EPSILON ) ) {
				discard;
			}

			float centerViewZ = -getViewZ( depth );
			bool rBreak = false, lBreak = false;

			float weightSum = sampleWeights[0];
			vec4 diffuseSum = texture2D( tDiffuse, vUv ) * weightSum;

			for( int i = 1; i <= KERNEL_RADIUS; i ++ ) {

				float sampleWeight = sampleWeights[i];
				vec2 sampleUvOffset = sampleUvOffsets[i] * vInvSize;

				vec2 sampleUv = vUv + sampleUvOffset;
				float viewZ = -getViewZ( getDepth( sampleUv ) );

				if( abs( viewZ - centerViewZ ) > depthCutoff ) rBreak = true;

				if( ! rBreak ) {
					diffuseSum += texture2D( tDiffuse, sampleUv ) * sampleWeight;
					weightSum += sampleWeight;
				}

				sampleUv = vUv - sampleUvOffset;
				viewZ = -getViewZ( getDepth( sampleUv ) );

				if( abs( viewZ - centerViewZ ) > depthCutoff ) lBreak = true;

				if( ! lBreak ) {
					diffuseSum += texture2D( tDiffuse, sampleUv ) * sampleWeight;
					weightSum += sampleWeight;
				}

			}

			gl_FragColor = diffuseSum / weightSum;
		}`},er={createSampleWeights:function(a,e){let t=[];for(let n=0;n<=a;n++)t.push(Xi(n,e));return t},createSampleOffsets:function(a,e){let t=[];for(let n=0;n<=a;n++)t.push(e.clone().multiplyScalar(n));return t},configure:function(a,e,t,n){a.defines.KERNEL_RADIUS=e,a.uniforms.sampleUvOffsets.value=er.createSampleOffsets(e,n),a.uniforms.sampleWeights.value=er.createSampleWeights(e,t),a.needsUpdate=!0}};function Xi(a,e){return Math.exp(-(a*a)/(2*(e*e)))/(Math.sqrt(2*Math.PI)*e)}var tr=class a extends Ue{constructor(e,t,n=new Y.Vector2(256,256)){super(),this.scene=e,this.camera=t,this.clear=!0,this.needsSwap=!1,this.originalClearColor=new Y.Color,this._oldClearColor=new Y.Color,this.oldClearAlpha=1,this.params={output:0,saoBias:.5,saoIntensity:.18,saoScale:1,saoKernelRadius:100,saoMinResolution:0,saoBlur:!0,saoBlurRadius:8,saoBlurStdDev:4,saoBlurDepthCutoff:.01},this.resolution=new Y.Vector2(n.x,n.y),this.saoRenderTarget=new Y.WebGLRenderTarget(this.resolution.x,this.resolution.y,{type:Y.HalfFloatType}),this.blurIntermediateRenderTarget=this.saoRenderTarget.clone();let r=new Y.DepthTexture;r.format=Y.DepthStencilFormat,r.type=Y.UnsignedInt248Type,this.normalRenderTarget=new Y.WebGLRenderTarget(this.resolution.x,this.resolution.y,{minFilter:Y.NearestFilter,magFilter:Y.NearestFilter,type:Y.HalfFloatType,depthTexture:r}),this.normalMaterial=new Y.MeshNormalMaterial,this.normalMaterial.blending=Y.NoBlending,this.saoMaterial=new Y.ShaderMaterial({defines:Object.assign({},$t.defines),fragmentShader:$t.fragmentShader,vertexShader:$t.vertexShader,uniforms:Y.UniformsUtils.clone($t.uniforms)}),this.saoMaterial.extensions.derivatives=!0,this.saoMaterial.defines.PERSPECTIVE_CAMERA=this.camera.isPerspectiveCamera?1:0,this.saoMaterial.uniforms.tDepth.value=r,this.saoMaterial.uniforms.tNormal.value=this.normalRenderTarget.texture,this.saoMaterial.uniforms.size.value.set(this.resolution.x,this.resolution.y),this.saoMaterial.uniforms.cameraInverseProjectionMatrix.value.copy(this.camera.projectionMatrixInverse),this.saoMaterial.uniforms.cameraProjectionMatrix.value=this.camera.projectionMatrix,this.saoMaterial.blending=Y.NoBlending,this.vBlurMaterial=new Y.ShaderMaterial({uniforms:Y.UniformsUtils.clone(ot.uniforms),defines:Object.assign({},ot.defines),vertexShader:ot.vertexShader,fragmentShader:ot.fragmentShader}),this.vBlurMaterial.defines.DEPTH_PACKING=0,this.vBlurMaterial.defines.PERSPECTIVE_CAMERA=this.camera.isPerspectiveCamera?1:0,this.vBlurMaterial.uniforms.tDiffuse.value=this.saoRenderTarget.texture,this.vBlurMaterial.uniforms.tDepth.value=r,this.vBlurMaterial.uniforms.size.value.set(this.resolution.x,this.resolution.y),this.vBlurMaterial.blending=Y.NoBlending,this.hBlurMaterial=new Y.ShaderMaterial({uniforms:Y.UniformsUtils.clone(ot.uniforms),defines:Object.assign({},ot.defines),vertexShader:ot.vertexShader,fragmentShader:ot.fragmentShader}),this.hBlurMaterial.defines.DEPTH_PACKING=0,this.hBlurMaterial.defines.PERSPECTIVE_CAMERA=this.camera.isPerspectiveCamera?1:0,this.hBlurMaterial.uniforms.tDiffuse.value=this.blurIntermediateRenderTarget.texture,this.hBlurMaterial.uniforms.tDepth.value=r,this.hBlurMaterial.uniforms.size.value.set(this.resolution.x,this.resolution.y),this.hBlurMaterial.blending=Y.NoBlending,this.materialCopy=new Y.ShaderMaterial({uniforms:Y.UniformsUtils.clone(qe.uniforms),vertexShader:qe.vertexShader,fragmentShader:qe.fragmentShader,blending:Y.NoBlending}),this.materialCopy.transparent=!0,this.materialCopy.depthTest=!1,this.materialCopy.depthWrite=!1,this.materialCopy.blending=Y.CustomBlending,this.materialCopy.blendSrc=Y.DstColorFactor,this.materialCopy.blendDst=Y.ZeroFactor,this.materialCopy.blendEquation=Y.AddEquation,this.materialCopy.blendSrcAlpha=Y.DstAlphaFactor,this.materialCopy.blendDstAlpha=Y.ZeroFactor,this.materialCopy.blendEquationAlpha=Y.AddEquation,this.fsQuad=new Ve(null)}render(e,t,n){this.renderToScreen&&(this.materialCopy.blending=Y.NoBlending,this.materialCopy.uniforms.tDiffuse.value=n.texture,this.materialCopy.needsUpdate=!0,this.renderPass(e,this.materialCopy,null)),e.getClearColor(this._oldClearColor),this.oldClearAlpha=e.getClearAlpha();let r=e.autoClear;e.autoClear=!1,this.saoMaterial.uniforms.bias.value=this.params.saoBias,this.saoMaterial.uniforms.intensity.value=this.params.saoIntensity,this.saoMaterial.uniforms.scale.value=this.params.saoScale,this.saoMaterial.uniforms.kernelRadius.value=this.params.saoKernelRadius,this.saoMaterial.uniforms.minResolution.value=this.params.saoMinResolution,this.saoMaterial.uniforms.cameraNear.value=this.camera.near,this.saoMaterial.uniforms.cameraFar.value=this.camera.far;let s=this.params.saoBlurDepthCutoff*(this.camera.far-this.camera.near);this.vBlurMaterial.uniforms.depthCutoff.value=s,this.hBlurMaterial.uniforms.depthCutoff.value=s,this.vBlurMaterial.uniforms.cameraNear.value=this.camera.near,this.vBlurMaterial.uniforms.cameraFar.value=this.camera.far,this.hBlurMaterial.uniforms.cameraNear.value=this.camera.near,this.hBlurMaterial.uniforms.cameraFar.value=this.camera.far,this.params.saoBlurRadius=Math.floor(this.params.saoBlurRadius),(this.prevStdDev!==this.params.saoBlurStdDev||this.prevNumSamples!==this.params.saoBlurRadius)&&(er.configure(this.vBlurMaterial,this.params.saoBlurRadius,this.params.saoBlurStdDev,new Y.Vector2(0,1)),er.configure(this.hBlurMaterial,this.params.saoBlurRadius,this.params.saoBlurStdDev,new Y.Vector2(1,0)),this.prevStdDev=this.params.saoBlurStdDev,this.prevNumSamples=this.params.saoBlurRadius),this.renderOverride(e,this.normalMaterial,this.normalRenderTarget,7829503,1),this.renderPass(e,this.saoMaterial,this.saoRenderTarget,16777215,1),this.params.saoBlur&&(this.renderPass(e,this.vBlurMaterial,this.blurIntermediateRenderTarget,16777215,1),this.renderPass(e,this.hBlurMaterial,this.saoRenderTarget,16777215,1));let i=this.materialCopy;this.params.output===a.OUTPUT.Normal?(this.materialCopy.uniforms.tDiffuse.value=this.normalRenderTarget.texture,this.materialCopy.needsUpdate=!0):(this.materialCopy.uniforms.tDiffuse.value=this.saoRenderTarget.texture,this.materialCopy.needsUpdate=!0),this.params.output===a.OUTPUT.Default?i.blending=Y.CustomBlending:i.blending=Y.NoBlending,this.renderPass(e,i,this.renderToScreen?null:n),e.setClearColor(this._oldClearColor,this.oldClearAlpha),e.autoClear=r}renderPass(e,t,n,r,s){e.getClearColor(this.originalClearColor);let i=e.getClearAlpha(),c=e.autoClear;e.setRenderTarget(n),e.autoClear=!1,r!=null&&(e.setClearColor(r),e.setClearAlpha(s||0),e.clear()),this.fsQuad.material=t,this.fsQuad.render(e),e.autoClear=c,e.setClearColor(this.originalClearColor),e.setClearAlpha(i)}renderOverride(e,t,n,r,s){e.getClearColor(this.originalClearColor);let i=e.getClearAlpha(),c=e.autoClear;e.setRenderTarget(n),e.autoClear=!1,r=t.clearColor||r,s=t.clearAlpha||s,r!=null&&(e.setClearColor(r),e.setClearAlpha(s||0),e.clear()),this.scene.overrideMaterial=t,e.render(this.scene,this.camera),this.scene.overrideMaterial=null,e.autoClear=c,e.setClearColor(this.originalClearColor),e.setClearAlpha(i)}setSize(e,t){this.saoRenderTarget.setSize(e,t),this.blurIntermediateRenderTarget.setSize(e,t),this.normalRenderTarget.setSize(e,t),this.saoMaterial.uniforms.size.value.set(e,t),this.saoMaterial.uniforms.cameraInverseProjectionMatrix.value.copy(this.camera.projectionMatrixInverse),this.saoMaterial.uniforms.cameraProjectionMatrix.value=this.camera.projectionMatrix,this.saoMaterial.needsUpdate=!0,this.vBlurMaterial.uniforms.size.value.set(e,t),this.vBlurMaterial.needsUpdate=!0,this.hBlurMaterial.uniforms.size.value.set(e,t),this.hBlurMaterial.needsUpdate=!0}dispose(){this.saoRenderTarget.dispose(),this.blurIntermediateRenderTarget.dispose(),this.normalRenderTarget.dispose(),this.normalMaterial.dispose(),this.saoMaterial.dispose(),this.vBlurMaterial.dispose(),this.hBlurMaterial.dispose(),this.materialCopy.dispose(),this.fsQuad.dispose()}};tr.OUTPUT={Default:0,SAO:1,Normal:2};var se=Ae(ge(),1);var Ln=Ae(ge(),1),In={name:"LuminosityHighPassShader",shaderID:"luminosityHighPass",uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new Ln.Color(0)},defaultOpacity:{value:0}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;
		uniform vec3 defaultColor;
		uniform float defaultOpacity;
		uniform float luminosityThreshold;
		uniform float smoothWidth;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );

			vec3 luma = vec3( 0.299, 0.587, 0.114 );

			float v = dot( texel.xyz, luma );

			vec4 outputColor = vec4( defaultColor.rgb, defaultOpacity );

			float alpha = smoothstep( luminosityThreshold, luminosityThreshold + smoothWidth, v );

			gl_FragColor = mix( outputColor, texel, alpha );

		}`};var Et=class a extends Ue{constructor(e,t,n,r){super(),this.strength=t!==void 0?t:1,this.radius=n,this.threshold=r,this.resolution=e!==void 0?new se.Vector2(e.x,e.y):new se.Vector2(256,256),this.clearColor=new se.Color(0,0,0),this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let s=Math.round(this.resolution.x/2),i=Math.round(this.resolution.y/2);this.renderTargetBright=new se.WebGLRenderTarget(s,i,{type:se.HalfFloatType}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let h=0;h<this.nMips;h++){let m=new se.WebGLRenderTarget(s,i,{type:se.HalfFloatType});m.texture.name="UnrealBloomPass.h"+h,m.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(m);let g=new se.WebGLRenderTarget(s,i,{type:se.HalfFloatType});g.texture.name="UnrealBloomPass.v"+h,g.texture.generateMipmaps=!1,this.renderTargetsVertical.push(g),s=Math.round(s/2),i=Math.round(i/2)}let c=In;this.highPassUniforms=se.UniformsUtils.clone(c.uniforms),this.highPassUniforms.luminosityThreshold.value=r,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new se.ShaderMaterial({uniforms:this.highPassUniforms,vertexShader:c.vertexShader,fragmentShader:c.fragmentShader}),this.separableBlurMaterials=[];let l=[3,5,7,9,11];s=Math.round(this.resolution.x/2),i=Math.round(this.resolution.y/2);for(let h=0;h<this.nMips;h++)this.separableBlurMaterials.push(this.getSeperableBlurMaterial(l[h])),this.separableBlurMaterials[h].uniforms.invSize.value=new se.Vector2(1/s,1/i),s=Math.round(s/2),i=Math.round(i/2);this.compositeMaterial=this.getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=t,this.compositeMaterial.uniforms.bloomRadius.value=.1;let f=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=f,this.bloomTintColors=[new se.Vector3(1,1,1),new se.Vector3(1,1,1),new se.Vector3(1,1,1),new se.Vector3(1,1,1),new se.Vector3(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors;let d=qe;this.copyUniforms=se.UniformsUtils.clone(d.uniforms),this.blendMaterial=new se.ShaderMaterial({uniforms:this.copyUniforms,vertexShader:d.vertexShader,fragmentShader:d.fragmentShader,blending:se.AdditiveBlending,depthTest:!1,depthWrite:!1,transparent:!0}),this.enabled=!0,this.needsSwap=!1,this._oldClearColor=new se.Color,this.oldClearAlpha=1,this.basic=new se.MeshBasicMaterial,this.fsQuad=new Ve(null)}dispose(){for(let e=0;e<this.renderTargetsHorizontal.length;e++)this.renderTargetsHorizontal[e].dispose();for(let e=0;e<this.renderTargetsVertical.length;e++)this.renderTargetsVertical[e].dispose();this.renderTargetBright.dispose();for(let e=0;e<this.separableBlurMaterials.length;e++)this.separableBlurMaterials[e].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this.basic.dispose(),this.fsQuad.dispose()}setSize(e,t){let n=Math.round(e/2),r=Math.round(t/2);this.renderTargetBright.setSize(n,r);for(let s=0;s<this.nMips;s++)this.renderTargetsHorizontal[s].setSize(n,r),this.renderTargetsVertical[s].setSize(n,r),this.separableBlurMaterials[s].uniforms.invSize.value=new se.Vector2(1/n,1/r),n=Math.round(n/2),r=Math.round(r/2)}render(e,t,n,r,s){e.getClearColor(this._oldClearColor),this.oldClearAlpha=e.getClearAlpha();let i=e.autoClear;e.autoClear=!1,e.setClearColor(this.clearColor,0),s&&e.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this.fsQuad.material=this.basic,this.basic.map=n.texture,e.setRenderTarget(null),e.clear(),this.fsQuad.render(e)),this.highPassUniforms.tDiffuse.value=n.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this.fsQuad.material=this.materialHighPassFilter,e.setRenderTarget(this.renderTargetBright),e.clear(),this.fsQuad.render(e);let c=this.renderTargetBright;for(let l=0;l<this.nMips;l++)this.fsQuad.material=this.separableBlurMaterials[l],this.separableBlurMaterials[l].uniforms.colorTexture.value=c.texture,this.separableBlurMaterials[l].uniforms.direction.value=a.BlurDirectionX,e.setRenderTarget(this.renderTargetsHorizontal[l]),e.clear(),this.fsQuad.render(e),this.separableBlurMaterials[l].uniforms.colorTexture.value=this.renderTargetsHorizontal[l].texture,this.separableBlurMaterials[l].uniforms.direction.value=a.BlurDirectionY,e.setRenderTarget(this.renderTargetsVertical[l]),e.clear(),this.fsQuad.render(e),c=this.renderTargetsVertical[l];this.fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,e.setRenderTarget(this.renderTargetsHorizontal[0]),e.clear(),this.fsQuad.render(e),this.fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,s&&e.state.buffers.stencil.setTest(!0),this.renderToScreen?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(n),this.fsQuad.render(e)),e.setClearColor(this._oldClearColor,this.oldClearAlpha),e.autoClear=i}getSeperableBlurMaterial(e){let t=[];for(let n=0;n<e;n++)t.push(.39894*Math.exp(-.5*n*n/(e*e))/e);return new se.ShaderMaterial({defines:{KERNEL_RADIUS:e},uniforms:{colorTexture:{value:null},invSize:{value:new se.Vector2(.5,.5)},direction:{value:new se.Vector2(.5,.5)},gaussianCoefficients:{value:t}},vertexShader:`varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`#include <common>
				varying vec2 vUv;
				uniform sampler2D colorTexture;
				uniform vec2 invSize;
				uniform vec2 direction;
				uniform float gaussianCoefficients[KERNEL_RADIUS];

				void main() {
					float weightSum = gaussianCoefficients[0];
					vec3 diffuseSum = texture2D( colorTexture, vUv ).rgb * weightSum;
					for( int i = 1; i < KERNEL_RADIUS; i ++ ) {
						float x = float(i);
						float w = gaussianCoefficients[i];
						vec2 uvOffset = direction * invSize * x;
						vec3 sample1 = texture2D( colorTexture, vUv + uvOffset ).rgb;
						vec3 sample2 = texture2D( colorTexture, vUv - uvOffset ).rgb;
						diffuseSum += (sample1 + sample2) * w;
						weightSum += 2.0 * w;
					}
					gl_FragColor = vec4(diffuseSum/weightSum, 1.0);
				}`})}getCompositeMaterial(e){return new se.ShaderMaterial({defines:{NUM_MIPS:e},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`varying vec2 vUv;
				uniform sampler2D blurTexture1;
				uniform sampler2D blurTexture2;
				uniform sampler2D blurTexture3;
				uniform sampler2D blurTexture4;
				uniform sampler2D blurTexture5;
				uniform float bloomStrength;
				uniform float bloomRadius;
				uniform float bloomFactors[NUM_MIPS];
				uniform vec3 bloomTintColors[NUM_MIPS];

				float lerpBloomFactor(const in float factor) {
					float mirrorFactor = 1.2 - factor;
					return mix(factor, mirrorFactor, bloomRadius);
				}

				void main() {
					gl_FragColor = bloomStrength * ( lerpBloomFactor(bloomFactors[0]) * vec4(bloomTintColors[0], 1.0) * texture2D(blurTexture1, vUv) +
						lerpBloomFactor(bloomFactors[1]) * vec4(bloomTintColors[1], 1.0) * texture2D(blurTexture2, vUv) +
						lerpBloomFactor(bloomFactors[2]) * vec4(bloomTintColors[2], 1.0) * texture2D(blurTexture3, vUv) +
						lerpBloomFactor(bloomFactors[3]) * vec4(bloomTintColors[3], 1.0) * texture2D(blurTexture4, vUv) +
						lerpBloomFactor(bloomFactors[4]) * vec4(bloomTintColors[4], 1.0) * texture2D(blurTexture5, vUv) );
				}`})}};Et.BlurDirectionX=new se.Vector2(1,0);Et.BlurDirectionY=new se.Vector2(0,1);var Ie=Ae(ge(),1);var On={name:"BokehShader",defines:{DEPTH_PACKING:1,PERSPECTIVE_CAMERA:1},uniforms:{tColor:{value:null},tDepth:{value:null},focus:{value:1},aspect:{value:1},aperture:{value:.025},maxblur:{value:.01},nearClip:{value:1},farClip:{value:1e3}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		#include <common>

		varying vec2 vUv;

		uniform sampler2D tColor;
		uniform sampler2D tDepth;

		uniform float maxblur; // max blur amount
		uniform float aperture; // aperture - bigger values for shallower depth of field

		uniform float nearClip;
		uniform float farClip;

		uniform float focus;
		uniform float aspect;

		#include <packing>

		float getDepth( const in vec2 screenPosition ) {
			#if DEPTH_PACKING == 1
			return unpackRGBAToDepth( texture2D( tDepth, screenPosition ) );
			#else
			return texture2D( tDepth, screenPosition ).x;
			#endif
		}

		float getViewZ( const in float depth ) {
			#if PERSPECTIVE_CAMERA == 1
			return perspectiveDepthToViewZ( depth, nearClip, farClip );
			#else
			return orthographicDepthToViewZ( depth, nearClip, farClip );
			#endif
		}


		void main() {

			vec2 aspectcorrect = vec2( 1.0, aspect );

			float viewZ = getViewZ( getDepth( vUv ) );

			float factor = ( focus + viewZ ); // viewZ is <= 0, so this is a difference equation

			vec2 dofblur = vec2 ( clamp( factor * aperture, -maxblur, maxblur ) );

			vec2 dofblur9 = dofblur * 0.9;
			vec2 dofblur7 = dofblur * 0.7;
			vec2 dofblur4 = dofblur * 0.4;

			vec4 col = vec4( 0.0 );

			col += texture2D( tColor, vUv.xy );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.0,   0.4  ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.15,  0.37 ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.29,  0.29 ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.37,  0.15 ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.40,  0.0  ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.37, -0.15 ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.29, -0.29 ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.15, -0.37 ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.0,  -0.4  ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.15,  0.37 ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.29,  0.29 ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.37,  0.15 ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.4,   0.0  ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.37, -0.15 ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.29, -0.29 ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.15, -0.37 ) * aspectcorrect ) * dofblur );

			col += texture2D( tColor, vUv.xy + ( vec2(  0.15,  0.37 ) * aspectcorrect ) * dofblur9 );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.37,  0.15 ) * aspectcorrect ) * dofblur9 );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.37, -0.15 ) * aspectcorrect ) * dofblur9 );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.15, -0.37 ) * aspectcorrect ) * dofblur9 );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.15,  0.37 ) * aspectcorrect ) * dofblur9 );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.37,  0.15 ) * aspectcorrect ) * dofblur9 );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.37, -0.15 ) * aspectcorrect ) * dofblur9 );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.15, -0.37 ) * aspectcorrect ) * dofblur9 );

			col += texture2D( tColor, vUv.xy + ( vec2(  0.29,  0.29 ) * aspectcorrect ) * dofblur7 );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.40,  0.0  ) * aspectcorrect ) * dofblur7 );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.29, -0.29 ) * aspectcorrect ) * dofblur7 );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.0,  -0.4  ) * aspectcorrect ) * dofblur7 );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.29,  0.29 ) * aspectcorrect ) * dofblur7 );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.4,   0.0  ) * aspectcorrect ) * dofblur7 );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.29, -0.29 ) * aspectcorrect ) * dofblur7 );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.0,   0.4  ) * aspectcorrect ) * dofblur7 );

			col += texture2D( tColor, vUv.xy + ( vec2(  0.29,  0.29 ) * aspectcorrect ) * dofblur4 );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.4,   0.0  ) * aspectcorrect ) * dofblur4 );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.29, -0.29 ) * aspectcorrect ) * dofblur4 );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.0,  -0.4  ) * aspectcorrect ) * dofblur4 );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.29,  0.29 ) * aspectcorrect ) * dofblur4 );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.4,   0.0  ) * aspectcorrect ) * dofblur4 );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.29, -0.29 ) * aspectcorrect ) * dofblur4 );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.0,   0.4  ) * aspectcorrect ) * dofblur4 );

			gl_FragColor = col / 41.0;
			gl_FragColor.a = 1.0;

		}`};var Ar=class extends Ue{constructor(e,t,n){super(),this.scene=e,this.camera=t;let r=n.focus!==void 0?n.focus:1,s=n.aperture!==void 0?n.aperture:.025,i=n.maxblur!==void 0?n.maxblur:1;this.renderTargetDepth=new Ie.WebGLRenderTarget(1,1,{minFilter:Ie.NearestFilter,magFilter:Ie.NearestFilter,type:Ie.HalfFloatType}),this.renderTargetDepth.texture.name="BokehPass.depth",this.materialDepth=new Ie.MeshDepthMaterial,this.materialDepth.depthPacking=Ie.RGBADepthPacking,this.materialDepth.blending=Ie.NoBlending;let c=On,l=Ie.UniformsUtils.clone(c.uniforms);l.tDepth.value=this.renderTargetDepth.texture,l.focus.value=r,l.aspect.value=t.aspect,l.aperture.value=s,l.maxblur.value=i,l.nearClip.value=t.near,l.farClip.value=t.far,this.materialBokeh=new Ie.ShaderMaterial({defines:Object.assign({},c.defines),uniforms:l,vertexShader:c.vertexShader,fragmentShader:c.fragmentShader}),this.uniforms=l,this.fsQuad=new Ve(this.materialBokeh),this._oldClearColor=new Ie.Color}render(e,t,n){this.scene.overrideMaterial=this.materialDepth,e.getClearColor(this._oldClearColor);let r=e.getClearAlpha(),s=e.autoClear;e.autoClear=!1,e.setClearColor(16777215),e.setClearAlpha(1),e.setRenderTarget(this.renderTargetDepth),e.clear(),e.render(this.scene,this.camera),this.uniforms.tColor.value=n.texture,this.uniforms.nearClip.value=this.camera.near,this.uniforms.farClip.value=this.camera.far,this.renderToScreen?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(t),e.clear(),this.fsQuad.render(e)),this.scene.overrideMaterial=null,e.setClearColor(this._oldClearColor),e.setClearAlpha(r),e.autoClear=s}setSize(e,t){this.materialBokeh.uniforms.aspect.value=e/t,this.renderTargetDepth.setSize(e,t)}dispose(){this.renderTargetDepth.dispose(),this.materialDepth.dispose(),this.materialBokeh.dispose(),this.fsQuad.dispose()}};var De=Ae(ge(),1);var Sr=Ae(ge(),1),rr={name:"SMAAEdgesShader",defines:{SMAA_THRESHOLD:"0.1"},uniforms:{tDiffuse:{value:null},resolution:{value:new Sr.Vector2(1/1024,1/512)}},vertexShader:`

		uniform vec2 resolution;

		varying vec2 vUv;
		varying vec4 vOffset[ 3 ];

		void SMAAEdgeDetectionVS( vec2 texcoord ) {
			vOffset[ 0 ] = texcoord.xyxy + resolution.xyxy * vec4( -1.0, 0.0, 0.0,  1.0 ); // WebGL port note: Changed sign in W component
			vOffset[ 1 ] = texcoord.xyxy + resolution.xyxy * vec4(  1.0, 0.0, 0.0, -1.0 ); // WebGL port note: Changed sign in W component
			vOffset[ 2 ] = texcoord.xyxy + resolution.xyxy * vec4( -2.0, 0.0, 0.0,  2.0 ); // WebGL port note: Changed sign in W component
		}

		void main() {

			vUv = uv;

			SMAAEdgeDetectionVS( vUv );

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;

		varying vec2 vUv;
		varying vec4 vOffset[ 3 ];

		vec4 SMAAColorEdgeDetectionPS( vec2 texcoord, vec4 offset[3], sampler2D colorTex ) {
			vec2 threshold = vec2( SMAA_THRESHOLD, SMAA_THRESHOLD );

			// Calculate color deltas:
			vec4 delta;
			vec3 C = texture2D( colorTex, texcoord ).rgb;

			vec3 Cleft = texture2D( colorTex, offset[0].xy ).rgb;
			vec3 t = abs( C - Cleft );
			delta.x = max( max( t.r, t.g ), t.b );

			vec3 Ctop = texture2D( colorTex, offset[0].zw ).rgb;
			t = abs( C - Ctop );
			delta.y = max( max( t.r, t.g ), t.b );

			// We do the usual threshold:
			vec2 edges = step( threshold, delta.xy );

			// Then discard if there is no edge:
			if ( dot( edges, vec2( 1.0, 1.0 ) ) == 0.0 )
				discard;

			// Calculate right and bottom deltas:
			vec3 Cright = texture2D( colorTex, offset[1].xy ).rgb;
			t = abs( C - Cright );
			delta.z = max( max( t.r, t.g ), t.b );

			vec3 Cbottom  = texture2D( colorTex, offset[1].zw ).rgb;
			t = abs( C - Cbottom );
			delta.w = max( max( t.r, t.g ), t.b );

			// Calculate the maximum delta in the direct neighborhood:
			float maxDelta = max( max( max( delta.x, delta.y ), delta.z ), delta.w );

			// Calculate left-left and top-top deltas:
			vec3 Cleftleft  = texture2D( colorTex, offset[2].xy ).rgb;
			t = abs( C - Cleftleft );
			delta.z = max( max( t.r, t.g ), t.b );

			vec3 Ctoptop = texture2D( colorTex, offset[2].zw ).rgb;
			t = abs( C - Ctoptop );
			delta.w = max( max( t.r, t.g ), t.b );

			// Calculate the final maximum delta:
			maxDelta = max( max( maxDelta, delta.z ), delta.w );

			// Local contrast adaptation in action:
			edges.xy *= step( 0.5 * maxDelta, delta.xy );

			return vec4( edges, 0.0, 0.0 );
		}

		void main() {

			gl_FragColor = SMAAColorEdgeDetectionPS( vUv, vOffset, tDiffuse );

		}`},nr={name:"SMAAWeightsShader",defines:{SMAA_MAX_SEARCH_STEPS:"8",SMAA_AREATEX_MAX_DISTANCE:"16",SMAA_AREATEX_PIXEL_SIZE:"( 1.0 / vec2( 160.0, 560.0 ) )",SMAA_AREATEX_SUBTEX_SIZE:"( 1.0 / 7.0 )"},uniforms:{tDiffuse:{value:null},tArea:{value:null},tSearch:{value:null},resolution:{value:new Sr.Vector2(1/1024,1/512)}},vertexShader:`

		uniform vec2 resolution;

		varying vec2 vUv;
		varying vec4 vOffset[ 3 ];
		varying vec2 vPixcoord;

		void SMAABlendingWeightCalculationVS( vec2 texcoord ) {
			vPixcoord = texcoord / resolution;

			// We will use these offsets for the searches later on (see @PSEUDO_GATHER4):
			vOffset[ 0 ] = texcoord.xyxy + resolution.xyxy * vec4( -0.25, 0.125, 1.25, 0.125 ); // WebGL port note: Changed sign in Y and W components
			vOffset[ 1 ] = texcoord.xyxy + resolution.xyxy * vec4( -0.125, 0.25, -0.125, -1.25 ); // WebGL port note: Changed sign in Y and W components

			// And these for the searches, they indicate the ends of the loops:
			vOffset[ 2 ] = vec4( vOffset[ 0 ].xz, vOffset[ 1 ].yw ) + vec4( -2.0, 2.0, -2.0, 2.0 ) * resolution.xxyy * float( SMAA_MAX_SEARCH_STEPS );

		}

		void main() {

			vUv = uv;

			SMAABlendingWeightCalculationVS( vUv );

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		#define SMAASampleLevelZeroOffset( tex, coord, offset ) texture2D( tex, coord + float( offset ) * resolution, 0.0 )

		uniform sampler2D tDiffuse;
		uniform sampler2D tArea;
		uniform sampler2D tSearch;
		uniform vec2 resolution;

		varying vec2 vUv;
		varying vec4 vOffset[3];
		varying vec2 vPixcoord;

		#if __VERSION__ == 100
		vec2 round( vec2 x ) {
			return sign( x ) * floor( abs( x ) + 0.5 );
		}
		#endif

		float SMAASearchLength( sampler2D searchTex, vec2 e, float bias, float scale ) {
			// Not required if searchTex accesses are set to point:
			// float2 SEARCH_TEX_PIXEL_SIZE = 1.0 / float2(66.0, 33.0);
			// e = float2(bias, 0.0) + 0.5 * SEARCH_TEX_PIXEL_SIZE +
			//     e * float2(scale, 1.0) * float2(64.0, 32.0) * SEARCH_TEX_PIXEL_SIZE;
			e.r = bias + e.r * scale;
			return 255.0 * texture2D( searchTex, e, 0.0 ).r;
		}

		float SMAASearchXLeft( sampler2D edgesTex, sampler2D searchTex, vec2 texcoord, float end ) {
			/**
				* @PSEUDO_GATHER4
				* This texcoord has been offset by (-0.25, -0.125) in the vertex shader to
				* sample between edge, thus fetching four edges in a row.
				* Sampling with different offsets in each direction allows to disambiguate
				* which edges are active from the four fetched ones.
				*/
			vec2 e = vec2( 0.0, 1.0 );

			for ( int i = 0; i < SMAA_MAX_SEARCH_STEPS; i ++ ) { // WebGL port note: Changed while to for
				e = texture2D( edgesTex, texcoord, 0.0 ).rg;
				texcoord -= vec2( 2.0, 0.0 ) * resolution;
				if ( ! ( texcoord.x > end && e.g > 0.8281 && e.r == 0.0 ) ) break;
			}

			// We correct the previous (-0.25, -0.125) offset we applied:
			texcoord.x += 0.25 * resolution.x;

			// The searches are bias by 1, so adjust the coords accordingly:
			texcoord.x += resolution.x;

			// Disambiguate the length added by the last step:
			texcoord.x += 2.0 * resolution.x; // Undo last step
			texcoord.x -= resolution.x * SMAASearchLength(searchTex, e, 0.0, 0.5);

			return texcoord.x;
		}

		float SMAASearchXRight( sampler2D edgesTex, sampler2D searchTex, vec2 texcoord, float end ) {
			vec2 e = vec2( 0.0, 1.0 );

			for ( int i = 0; i < SMAA_MAX_SEARCH_STEPS; i ++ ) { // WebGL port note: Changed while to for
				e = texture2D( edgesTex, texcoord, 0.0 ).rg;
				texcoord += vec2( 2.0, 0.0 ) * resolution;
				if ( ! ( texcoord.x < end && e.g > 0.8281 && e.r == 0.0 ) ) break;
			}

			texcoord.x -= 0.25 * resolution.x;
			texcoord.x -= resolution.x;
			texcoord.x -= 2.0 * resolution.x;
			texcoord.x += resolution.x * SMAASearchLength( searchTex, e, 0.5, 0.5 );

			return texcoord.x;
		}

		float SMAASearchYUp( sampler2D edgesTex, sampler2D searchTex, vec2 texcoord, float end ) {
			vec2 e = vec2( 1.0, 0.0 );

			for ( int i = 0; i < SMAA_MAX_SEARCH_STEPS; i ++ ) { // WebGL port note: Changed while to for
				e = texture2D( edgesTex, texcoord, 0.0 ).rg;
				texcoord += vec2( 0.0, 2.0 ) * resolution; // WebGL port note: Changed sign
				if ( ! ( texcoord.y > end && e.r > 0.8281 && e.g == 0.0 ) ) break;
			}

			texcoord.y -= 0.25 * resolution.y; // WebGL port note: Changed sign
			texcoord.y -= resolution.y; // WebGL port note: Changed sign
			texcoord.y -= 2.0 * resolution.y; // WebGL port note: Changed sign
			texcoord.y += resolution.y * SMAASearchLength( searchTex, e.gr, 0.0, 0.5 ); // WebGL port note: Changed sign

			return texcoord.y;
		}

		float SMAASearchYDown( sampler2D edgesTex, sampler2D searchTex, vec2 texcoord, float end ) {
			vec2 e = vec2( 1.0, 0.0 );

			for ( int i = 0; i < SMAA_MAX_SEARCH_STEPS; i ++ ) { // WebGL port note: Changed while to for
				e = texture2D( edgesTex, texcoord, 0.0 ).rg;
				texcoord -= vec2( 0.0, 2.0 ) * resolution; // WebGL port note: Changed sign
				if ( ! ( texcoord.y < end && e.r > 0.8281 && e.g == 0.0 ) ) break;
			}

			texcoord.y += 0.25 * resolution.y; // WebGL port note: Changed sign
			texcoord.y += resolution.y; // WebGL port note: Changed sign
			texcoord.y += 2.0 * resolution.y; // WebGL port note: Changed sign
			texcoord.y -= resolution.y * SMAASearchLength( searchTex, e.gr, 0.5, 0.5 ); // WebGL port note: Changed sign

			return texcoord.y;
		}

		vec2 SMAAArea( sampler2D areaTex, vec2 dist, float e1, float e2, float offset ) {
			// Rounding prevents precision errors of bilinear filtering:
			vec2 texcoord = float( SMAA_AREATEX_MAX_DISTANCE ) * round( 4.0 * vec2( e1, e2 ) ) + dist;

			// We do a scale and bias for mapping to texel space:
			texcoord = SMAA_AREATEX_PIXEL_SIZE * texcoord + ( 0.5 * SMAA_AREATEX_PIXEL_SIZE );

			// Move to proper place, according to the subpixel offset:
			texcoord.y += SMAA_AREATEX_SUBTEX_SIZE * offset;

			return texture2D( areaTex, texcoord, 0.0 ).rg;
		}

		vec4 SMAABlendingWeightCalculationPS( vec2 texcoord, vec2 pixcoord, vec4 offset[ 3 ], sampler2D edgesTex, sampler2D areaTex, sampler2D searchTex, ivec4 subsampleIndices ) {
			vec4 weights = vec4( 0.0, 0.0, 0.0, 0.0 );

			vec2 e = texture2D( edgesTex, texcoord ).rg;

			if ( e.g > 0.0 ) { // Edge at north
				vec2 d;

				// Find the distance to the left:
				vec2 coords;
				coords.x = SMAASearchXLeft( edgesTex, searchTex, offset[ 0 ].xy, offset[ 2 ].x );
				coords.y = offset[ 1 ].y; // offset[1].y = texcoord.y - 0.25 * resolution.y (@CROSSING_OFFSET)
				d.x = coords.x;

				// Now fetch the left crossing edges, two at a time using bilinear
				// filtering. Sampling at -0.25 (see @CROSSING_OFFSET) enables to
				// discern what value each edge has:
				float e1 = texture2D( edgesTex, coords, 0.0 ).r;

				// Find the distance to the right:
				coords.x = SMAASearchXRight( edgesTex, searchTex, offset[ 0 ].zw, offset[ 2 ].y );
				d.y = coords.x;

				// We want the distances to be in pixel units (doing this here allow to
				// better interleave arithmetic and memory accesses):
				d = d / resolution.x - pixcoord.x;

				// SMAAArea below needs a sqrt, as the areas texture is compressed
				// quadratically:
				vec2 sqrt_d = sqrt( abs( d ) );

				// Fetch the right crossing edges:
				coords.y -= 1.0 * resolution.y; // WebGL port note: Added
				float e2 = SMAASampleLevelZeroOffset( edgesTex, coords, ivec2( 1, 0 ) ).r;

				// Ok, we know how this pattern looks like, now it is time for getting
				// the actual area:
				weights.rg = SMAAArea( areaTex, sqrt_d, e1, e2, float( subsampleIndices.y ) );
			}

			if ( e.r > 0.0 ) { // Edge at west
				vec2 d;

				// Find the distance to the top:
				vec2 coords;

				coords.y = SMAASearchYUp( edgesTex, searchTex, offset[ 1 ].xy, offset[ 2 ].z );
				coords.x = offset[ 0 ].x; // offset[1].x = texcoord.x - 0.25 * resolution.x;
				d.x = coords.y;

				// Fetch the top crossing edges:
				float e1 = texture2D( edgesTex, coords, 0.0 ).g;

				// Find the distance to the bottom:
				coords.y = SMAASearchYDown( edgesTex, searchTex, offset[ 1 ].zw, offset[ 2 ].w );
				d.y = coords.y;

				// We want the distances to be in pixel units:
				d = d / resolution.y - pixcoord.y;

				// SMAAArea below needs a sqrt, as the areas texture is compressed
				// quadratically:
				vec2 sqrt_d = sqrt( abs( d ) );

				// Fetch the bottom crossing edges:
				coords.y -= 1.0 * resolution.y; // WebGL port note: Added
				float e2 = SMAASampleLevelZeroOffset( edgesTex, coords, ivec2( 0, 1 ) ).g;

				// Get the area for this direction:
				weights.ba = SMAAArea( areaTex, sqrt_d, e1, e2, float( subsampleIndices.x ) );
			}

			return weights;
		}

		void main() {

			gl_FragColor = SMAABlendingWeightCalculationPS( vUv, vPixcoord, vOffset, tDiffuse, tArea, tSearch, ivec4( 0.0 ) );

		}`},Tr={name:"SMAABlendShader",uniforms:{tDiffuse:{value:null},tColor:{value:null},resolution:{value:new Sr.Vector2(1/1024,1/512)}},vertexShader:`

		uniform vec2 resolution;

		varying vec2 vUv;
		varying vec4 vOffset[ 2 ];

		void SMAANeighborhoodBlendingVS( vec2 texcoord ) {
			vOffset[ 0 ] = texcoord.xyxy + resolution.xyxy * vec4( -1.0, 0.0, 0.0, 1.0 ); // WebGL port note: Changed sign in W component
			vOffset[ 1 ] = texcoord.xyxy + resolution.xyxy * vec4( 1.0, 0.0, 0.0, -1.0 ); // WebGL port note: Changed sign in W component
		}

		void main() {

			vUv = uv;

			SMAANeighborhoodBlendingVS( vUv );

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;
		uniform sampler2D tColor;
		uniform vec2 resolution;

		varying vec2 vUv;
		varying vec4 vOffset[ 2 ];

		vec4 SMAANeighborhoodBlendingPS( vec2 texcoord, vec4 offset[ 2 ], sampler2D colorTex, sampler2D blendTex ) {
			// Fetch the blending weights for current pixel:
			vec4 a;
			a.xz = texture2D( blendTex, texcoord ).xz;
			a.y = texture2D( blendTex, offset[ 1 ].zw ).g;
			a.w = texture2D( blendTex, offset[ 1 ].xy ).a;

			// Is there any blending weight with a value greater than 0.0?
			if ( dot(a, vec4( 1.0, 1.0, 1.0, 1.0 )) < 1e-5 ) {
				return texture2D( colorTex, texcoord, 0.0 );
			} else {
				// Up to 4 lines can be crossing a pixel (one through each edge). We
				// favor blending by choosing the line with the maximum weight for each
				// direction:
				vec2 offset;
				offset.x = a.a > a.b ? a.a : -a.b; // left vs. right
				offset.y = a.g > a.r ? -a.g : a.r; // top vs. bottom // WebGL port note: Changed signs

				// Then we go in the direction that has the maximum weight:
				if ( abs( offset.x ) > abs( offset.y )) { // horizontal vs. vertical
					offset.y = 0.0;
				} else {
					offset.x = 0.0;
				}

				// Fetch the opposite color and lerp by hand:
				vec4 C = texture2D( colorTex, texcoord, 0.0 );
				texcoord += sign( offset ) * resolution;
				vec4 Cop = texture2D( colorTex, texcoord, 0.0 );
				float s = abs( offset.x ) > abs( offset.y ) ? abs( offset.x ) : abs( offset.y );

				// WebGL port note: Added gamma correction
				C.xyz = pow(C.xyz, vec3(2.2));
				Cop.xyz = pow(Cop.xyz, vec3(2.2));
				vec4 mixed = mix(C, Cop, s);
				mixed.xyz = pow(mixed.xyz, vec3(1.0 / 2.2));

				return mixed;
			}
		}

		void main() {

			gl_FragColor = SMAANeighborhoodBlendingPS( vUv, vOffset, tColor, tDiffuse );

		}`};var Mr=class extends Ue{constructor(e,t){super(),this.edgesRT=new De.WebGLRenderTarget(e,t,{depthBuffer:!1,type:De.HalfFloatType}),this.edgesRT.texture.name="SMAAPass.edges",this.weightsRT=new De.WebGLRenderTarget(e,t,{depthBuffer:!1,type:De.HalfFloatType}),this.weightsRT.texture.name="SMAAPass.weights";let n=this,r=new Image;r.src=this.getAreaTexture(),r.onload=function(){n.areaTexture.needsUpdate=!0},this.areaTexture=new De.Texture,this.areaTexture.name="SMAAPass.area",this.areaTexture.image=r,this.areaTexture.minFilter=De.LinearFilter,this.areaTexture.generateMipmaps=!1,this.areaTexture.flipY=!1;let s=new Image;s.src=this.getSearchTexture(),s.onload=function(){n.searchTexture.needsUpdate=!0},this.searchTexture=new De.Texture,this.searchTexture.name="SMAAPass.search",this.searchTexture.image=s,this.searchTexture.magFilter=De.NearestFilter,this.searchTexture.minFilter=De.NearestFilter,this.searchTexture.generateMipmaps=!1,this.searchTexture.flipY=!1,this.uniformsEdges=De.UniformsUtils.clone(rr.uniforms),this.uniformsEdges.resolution.value.set(1/e,1/t),this.materialEdges=new De.ShaderMaterial({defines:Object.assign({},rr.defines),uniforms:this.uniformsEdges,vertexShader:rr.vertexShader,fragmentShader:rr.fragmentShader}),this.uniformsWeights=De.UniformsUtils.clone(nr.uniforms),this.uniformsWeights.resolution.value.set(1/e,1/t),this.uniformsWeights.tDiffuse.value=this.edgesRT.texture,this.uniformsWeights.tArea.value=this.areaTexture,this.uniformsWeights.tSearch.value=this.searchTexture,this.materialWeights=new De.ShaderMaterial({defines:Object.assign({},nr.defines),uniforms:this.uniformsWeights,vertexShader:nr.vertexShader,fragmentShader:nr.fragmentShader}),this.uniformsBlend=De.UniformsUtils.clone(Tr.uniforms),this.uniformsBlend.resolution.value.set(1/e,1/t),this.uniformsBlend.tDiffuse.value=this.weightsRT.texture,this.materialBlend=new De.ShaderMaterial({uniforms:this.uniformsBlend,vertexShader:Tr.vertexShader,fragmentShader:Tr.fragmentShader}),this.fsQuad=new Ve(null)}render(e,t,n){this.uniformsEdges.tDiffuse.value=n.texture,this.fsQuad.material=this.materialEdges,e.setRenderTarget(this.edgesRT),this.clear&&e.clear(),this.fsQuad.render(e),this.fsQuad.material=this.materialWeights,e.setRenderTarget(this.weightsRT),this.clear&&e.clear(),this.fsQuad.render(e),this.uniformsBlend.tColor.value=n.texture,this.fsQuad.material=this.materialBlend,this.renderToScreen?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(),this.fsQuad.render(e))}setSize(e,t){this.edgesRT.setSize(e,t),this.weightsRT.setSize(e,t),this.materialEdges.uniforms.resolution.value.set(1/e,1/t),this.materialWeights.uniforms.resolution.value.set(1/e,1/t),this.materialBlend.uniforms.resolution.value.set(1/e,1/t)}getAreaTexture(){return"data:image/png;base64,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"}getSearchTexture(){return"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEIAAAAhCAAAAABIXyLAAAAAOElEQVRIx2NgGAWjYBSMglEwEICREYRgFBZBqDCSLA2MGPUIVQETE9iNUAqLR5gIeoQKRgwXjwAAGn4AtaFeYLEAAAAASUVORK5CYII="}dispose(){this.edgesRT.dispose(),this.weightsRT.dispose(),this.areaTexture.dispose(),this.searchTexture.dispose(),this.materialEdges.dispose(),this.materialWeights.dispose(),this.materialBlend.dispose(),this.fsQuad.dispose()}};var He=Ae(ge(),1);var Bn={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
		precision highp float;

		uniform mat4 modelViewMatrix;
		uniform mat4 projectionMatrix;

		attribute vec3 position;
		attribute vec2 uv;

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`
	
		precision highp float;

		uniform sampler2D tDiffuse;

		#include <tonemapping_pars_fragment>
		#include <colorspace_pars_fragment>

		varying vec2 vUv;

		void main() {

			gl_FragColor = texture2D( tDiffuse, vUv );

			// tone mapping

			#ifdef LINEAR_TONE_MAPPING

				gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );

			#elif defined( REINHARD_TONE_MAPPING )

				gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );

			#elif defined( CINEON_TONE_MAPPING )

				gl_FragColor.rgb = OptimizedCineonToneMapping( gl_FragColor.rgb );

			#elif defined( ACES_FILMIC_TONE_MAPPING )

				gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );

			#elif defined( AGX_TONE_MAPPING )

				gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );

			#endif

			// color space

			#ifdef SRGB_TRANSFER

				gl_FragColor = sRGBTransferOETF( gl_FragColor );

			#endif

		}`};var yr=class extends Ue{constructor(){super();let e=Bn;this.uniforms=He.UniformsUtils.clone(e.uniforms),this.material=new He.RawShaderMaterial({name:e.name,uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader}),this.fsQuad=new Ve(this.material),this._outputColorSpace=null,this._toneMapping=null}render(e,t,n){this.uniforms.tDiffuse.value=n.texture,this.uniforms.toneMappingExposure.value=e.toneMappingExposure,(this._outputColorSpace!==e.outputColorSpace||this._toneMapping!==e.toneMapping)&&(this._outputColorSpace=e.outputColorSpace,this._toneMapping=e.toneMapping,this.material.defines={},He.ColorManagement.getTransfer(this._outputColorSpace)===He.SRGBTransfer&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===He.LinearToneMapping?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===He.ReinhardToneMapping?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===He.CineonToneMapping?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===He.ACESFilmicToneMapping?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===He.AgXToneMapping&&(this.material.defines.AGX_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this.fsQuad.render(e))}dispose(){this.material.dispose(),this.fsQuad.dispose()}};var Xe=Ae(ge(),1),ir=class a extends Xe.Mesh{constructor(){let e=a.SkyShader,t=new Xe.ShaderMaterial({name:e.name,uniforms:Xe.UniformsUtils.clone(e.uniforms),vertexShader:e.vertexShader,fragmentShader:e.fragmentShader,side:Xe.BackSide,depthWrite:!1});super(new Xe.BoxGeometry(1,1,1),t),this.isSky=!0}};ir.SkyShader={name:"SkyShader",uniforms:{turbidity:{value:2},rayleigh:{value:1},mieCoefficient:{value:.005},mieDirectionalG:{value:.8},sunPosition:{value:new Xe.Vector3},up:{value:new Xe.Vector3(0,1,0)}},vertexShader:`
		uniform vec3 sunPosition;
		uniform float rayleigh;
		uniform float turbidity;
		uniform float mieCoefficient;
		uniform vec3 up;

		varying vec3 vWorldPosition;
		varying vec3 vSunDirection;
		varying float vSunfade;
		varying vec3 vBetaR;
		varying vec3 vBetaM;
		varying float vSunE;

		// constants for atmospheric scattering
		const float e = 2.71828182845904523536028747135266249775724709369995957;
		const float pi = 3.141592653589793238462643383279502884197169;

		// wavelength of used primaries, according to preetham
		const vec3 lambda = vec3( 680E-9, 550E-9, 450E-9 );
		// this pre-calcuation replaces older TotalRayleigh(vec3 lambda) function:
		// (8.0 * pow(pi, 3.0) * pow(pow(n, 2.0) - 1.0, 2.0) * (6.0 + 3.0 * pn)) / (3.0 * N * pow(lambda, vec3(4.0)) * (6.0 - 7.0 * pn))
		const vec3 totalRayleigh = vec3( 5.804542996261093E-6, 1.3562911419845635E-5, 3.0265902468824876E-5 );

		// mie stuff
		// K coefficient for the primaries
		const float v = 4.0;
		const vec3 K = vec3( 0.686, 0.678, 0.666 );
		// MieConst = pi * pow( ( 2.0 * pi ) / lambda, vec3( v - 2.0 ) ) * K
		const vec3 MieConst = vec3( 1.8399918514433978E14, 2.7798023919660528E14, 4.0790479543861094E14 );

		// earth shadow hack
		// cutoffAngle = pi / 1.95;
		const float cutoffAngle = 1.6110731556870734;
		const float steepness = 1.5;
		const float EE = 1000.0;

		float sunIntensity( float zenithAngleCos ) {
			zenithAngleCos = clamp( zenithAngleCos, -1.0, 1.0 );
			return EE * max( 0.0, 1.0 - pow( e, -( ( cutoffAngle - acos( zenithAngleCos ) ) / steepness ) ) );
		}

		vec3 totalMie( float T ) {
			float c = ( 0.2 * T ) * 10E-18;
			return 0.434 * c * MieConst;
		}

		void main() {

			vec4 worldPosition = modelMatrix * vec4( position, 1.0 );
			vWorldPosition = worldPosition.xyz;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			gl_Position.z = gl_Position.w; // set z to camera.far

			vSunDirection = normalize( sunPosition );

			vSunE = sunIntensity( dot( vSunDirection, up ) );

			vSunfade = 1.0 - clamp( 1.0 - exp( ( sunPosition.y / 450000.0 ) ), 0.0, 1.0 );

			float rayleighCoefficient = rayleigh - ( 1.0 * ( 1.0 - vSunfade ) );

			// extinction (absorbtion + out scattering)
			// rayleigh coefficients
			vBetaR = totalRayleigh * rayleighCoefficient;

			// mie coefficients
			vBetaM = totalMie( turbidity ) * mieCoefficient;

		}`,fragmentShader:`
		varying vec3 vWorldPosition;
		varying vec3 vSunDirection;
		varying float vSunfade;
		varying vec3 vBetaR;
		varying vec3 vBetaM;
		varying float vSunE;

		uniform float mieDirectionalG;
		uniform vec3 up;

		// constants for atmospheric scattering
		const float pi = 3.141592653589793238462643383279502884197169;

		const float n = 1.0003; // refractive index of air
		const float N = 2.545E25; // number of molecules per unit volume for air at 288.15K and 1013mb (sea level -45 celsius)

		// optical length at zenith for molecules
		const float rayleighZenithLength = 8.4E3;
		const float mieZenithLength = 1.25E3;
		// 66 arc seconds -> degrees, and the cosine of that
		const float sunAngularDiameterCos = 0.999956676946448443553574619906976478926848692873900859324;

		// 3.0 / ( 16.0 * pi )
		const float THREE_OVER_SIXTEENPI = 0.05968310365946075;
		// 1.0 / ( 4.0 * pi )
		const float ONE_OVER_FOURPI = 0.07957747154594767;

		float rayleighPhase( float cosTheta ) {
			return THREE_OVER_SIXTEENPI * ( 1.0 + pow( cosTheta, 2.0 ) );
		}

		float hgPhase( float cosTheta, float g ) {
			float g2 = pow( g, 2.0 );
			float inverse = 1.0 / pow( 1.0 - 2.0 * g * cosTheta + g2, 1.5 );
			return ONE_OVER_FOURPI * ( ( 1.0 - g2 ) * inverse );
		}

		void main() {

			vec3 direction = normalize( vWorldPosition - cameraPosition );

			// optical length
			// cutoff angle at 90 to avoid singularity in next formula.
			float zenithAngle = acos( max( 0.0, dot( up, direction ) ) );
			float inverse = 1.0 / ( cos( zenithAngle ) + 0.15 * pow( 93.885 - ( ( zenithAngle * 180.0 ) / pi ), -1.253 ) );
			float sR = rayleighZenithLength * inverse;
			float sM = mieZenithLength * inverse;

			// combined extinction factor
			vec3 Fex = exp( -( vBetaR * sR + vBetaM * sM ) );

			// in scattering
			float cosTheta = dot( direction, vSunDirection );

			float rPhase = rayleighPhase( cosTheta * 0.5 + 0.5 );
			vec3 betaRTheta = vBetaR * rPhase;

			float mPhase = hgPhase( cosTheta, mieDirectionalG );
			vec3 betaMTheta = vBetaM * mPhase;

			vec3 Lin = pow( vSunE * ( ( betaRTheta + betaMTheta ) / ( vBetaR + vBetaM ) ) * ( 1.0 - Fex ), vec3( 1.5 ) );
			Lin *= mix( vec3( 1.0 ), pow( vSunE * ( ( betaRTheta + betaMTheta ) / ( vBetaR + vBetaM ) ) * Fex, vec3( 1.0 / 2.0 ) ), clamp( pow( 1.0 - dot( up, vSunDirection ), 5.0 ), 0.0, 1.0 ) );

			// nightsky
			float theta = acos( direction.y ); // elevation --> y-axis, [-pi/2, pi/2]
			float phi = atan( direction.z, direction.x ); // azimuth --> x-axis [-pi/2, pi/2]
			vec2 uv = vec2( phi, theta ) / vec2( 2.0 * pi, pi ) + vec2( 0.5, 0.0 );
			vec3 L0 = vec3( 0.1 ) * Fex;

			// composition + solar disc
			float sundisk = smoothstep( sunAngularDiameterCos, sunAngularDiameterCos + 0.00002, cosTheta );
			L0 += ( vSunE * 19000.0 * Fex ) * sundisk;

			vec3 texColor = ( Lin + L0 ) * 0.04 + vec3( 0.0, 0.0003, 0.00075 );

			vec3 retColor = pow( texColor, vec3( 1.0 / ( 1.2 + ( 1.2 * vSunfade ) ) ) );

			gl_FragColor = vec4( retColor, 1.0 );

			#include <tonemapping_fragment>
			#include <colorspace_fragment>

		}`};var re=Ae(ge(),1),br=class extends re.Mesh{constructor(e,t={}){super(e),this.isWater=!0;let n=this,r=t.textureWidth!==void 0?t.textureWidth:512,s=t.textureHeight!==void 0?t.textureHeight:512,i=t.clipBias!==void 0?t.clipBias:0,c=t.alpha!==void 0?t.alpha:1,l=t.time!==void 0?t.time:0,f=t.waterNormals!==void 0?t.waterNormals:null,d=t.sunDirection!==void 0?t.sunDirection:new re.Vector3(.70707,.70707,0),h=new re.Color(t.sunColor!==void 0?t.sunColor:16777215),m=new re.Color(t.waterColor!==void 0?t.waterColor:8355711),g=t.eye!==void 0?t.eye:new re.Vector3(0,0,0),y=t.distortionScale!==void 0?t.distortionScale:20,M=t.side!==void 0?t.side:re.FrontSide,A=t.fog!==void 0?t.fog:!1,b=new re.Plane,E=new re.Vector3,N=new re.Vector3,D=new re.Vector3,L=new re.Matrix4,j=new re.Vector3(0,0,-1),F=new re.Vector4,S=new re.Vector3,R=new re.Vector3,U=new re.Vector4,H=new re.Matrix4,B=new re.PerspectiveCamera,_=new re.WebGLRenderTarget(r,s),G={name:"MirrorShader",uniforms:re.UniformsUtils.merge([re.UniformsLib.fog,re.UniformsLib.lights,{normalSampler:{value:null},mirrorSampler:{value:null},alpha:{value:1},time:{value:0},size:{value:1},distortionScale:{value:20},textureMatrix:{value:new re.Matrix4},sunColor:{value:new re.Color(8355711)},sunDirection:{value:new re.Vector3(.70707,.70707,0)},eye:{value:new re.Vector3},waterColor:{value:new re.Color(5592405)}}]),vertexShader:`
				uniform mat4 textureMatrix;
				uniform float time;

				varying vec4 mirrorCoord;
				varying vec4 worldPosition;

				#include <common>
				#include <fog_pars_vertex>
				#include <shadowmap_pars_vertex>
				#include <logdepthbuf_pars_vertex>

				void main() {
					mirrorCoord = modelMatrix * vec4( position, 1.0 );
					worldPosition = mirrorCoord.xyzw;
					mirrorCoord = textureMatrix * mirrorCoord;
					vec4 mvPosition =  modelViewMatrix * vec4( position, 1.0 );
					gl_Position = projectionMatrix * mvPosition;

				#include <beginnormal_vertex>
				#include <defaultnormal_vertex>
				#include <logdepthbuf_vertex>
				#include <fog_vertex>
				#include <shadowmap_vertex>
			}`,fragmentShader:`
				uniform sampler2D mirrorSampler;
				uniform float alpha;
				uniform float time;
				uniform float size;
				uniform float distortionScale;
				uniform sampler2D normalSampler;
				uniform vec3 sunColor;
				uniform vec3 sunDirection;
				uniform vec3 eye;
				uniform vec3 waterColor;

				varying vec4 mirrorCoord;
				varying vec4 worldPosition;

				vec4 getNoise( vec2 uv ) {
					vec2 uv0 = ( uv / 103.0 ) + vec2(time / 17.0, time / 29.0);
					vec2 uv1 = uv / 107.0-vec2( time / -19.0, time / 31.0 );
					vec2 uv2 = uv / vec2( 8907.0, 9803.0 ) + vec2( time / 101.0, time / 97.0 );
					vec2 uv3 = uv / vec2( 1091.0, 1027.0 ) - vec2( time / 109.0, time / -113.0 );
					vec4 noise = texture2D( normalSampler, uv0 ) +
						texture2D( normalSampler, uv1 ) +
						texture2D( normalSampler, uv2 ) +
						texture2D( normalSampler, uv3 );
					return noise * 0.5 - 1.0;
				}

				void sunLight( const vec3 surfaceNormal, const vec3 eyeDirection, float shiny, float spec, float diffuse, inout vec3 diffuseColor, inout vec3 specularColor ) {
					vec3 reflection = normalize( reflect( -sunDirection, surfaceNormal ) );
					float direction = max( 0.0, dot( eyeDirection, reflection ) );
					specularColor += pow( direction, shiny ) * sunColor * spec;
					diffuseColor += max( dot( sunDirection, surfaceNormal ), 0.0 ) * sunColor * diffuse;
				}

				#include <common>
				#include <packing>
				#include <bsdfs>
				#include <fog_pars_fragment>
				#include <logdepthbuf_pars_fragment>
				#include <lights_pars_begin>
				#include <shadowmap_pars_fragment>
				#include <shadowmask_pars_fragment>

				void main() {

					#include <logdepthbuf_fragment>
					vec4 noise = getNoise( worldPosition.xz * size );
					vec3 surfaceNormal = normalize( noise.xzy * vec3( 1.5, 1.0, 1.5 ) );

					vec3 diffuseLight = vec3(0.0);
					vec3 specularLight = vec3(0.0);

					vec3 worldToEye = eye-worldPosition.xyz;
					vec3 eyeDirection = normalize( worldToEye );
					sunLight( surfaceNormal, eyeDirection, 100.0, 2.0, 0.5, diffuseLight, specularLight );

					float distance = length(worldToEye);

					vec2 distortion = surfaceNormal.xz * ( 0.001 + 1.0 / distance ) * distortionScale;
					vec3 reflectionSample = vec3( texture2D( mirrorSampler, mirrorCoord.xy / mirrorCoord.w + distortion ) );

					float theta = max( dot( eyeDirection, surfaceNormal ), 0.0 );
					float rf0 = 0.3;
					float reflectance = rf0 + ( 1.0 - rf0 ) * pow( ( 1.0 - theta ), 5.0 );
					vec3 scatter = max( 0.0, dot( surfaceNormal, eyeDirection ) ) * waterColor;
					vec3 albedo = mix( ( sunColor * diffuseLight * 0.3 + scatter ) * getShadowMask(), ( vec3( 0.1 ) + reflectionSample * 0.9 + reflectionSample * specularLight ), reflectance);
					vec3 outgoingLight = albedo;
					gl_FragColor = vec4( outgoingLight, alpha );

					#include <tonemapping_fragment>
					#include <colorspace_fragment>
					#include <fog_fragment>	
				}`},q=new re.ShaderMaterial({name:G.name,uniforms:re.UniformsUtils.clone(G.uniforms),vertexShader:G.vertexShader,fragmentShader:G.fragmentShader,lights:!0,side:M,fog:A});q.uniforms.mirrorSampler.value=_.texture,q.uniforms.textureMatrix.value=H,q.uniforms.alpha.value=c,q.uniforms.time.value=l,q.uniforms.normalSampler.value=f,q.uniforms.sunColor.value=h,q.uniforms.waterColor.value=m,q.uniforms.sunDirection.value=d,q.uniforms.distortionScale.value=y,q.uniforms.eye.value=g,n.material=q,n.onBeforeRender=function(V,Se,Me){if(N.setFromMatrixPosition(n.matrixWorld),D.setFromMatrixPosition(Me.matrixWorld),L.extractRotation(n.matrixWorld),E.set(0,0,1),E.applyMatrix4(L),S.subVectors(N,D),S.dot(E)>0)return;S.reflect(E).negate(),S.add(N),L.extractRotation(Me.matrixWorld),j.set(0,0,-1),j.applyMatrix4(L),j.add(D),R.subVectors(N,j),R.reflect(E).negate(),R.add(N),B.position.copy(S),B.up.set(0,1,0),B.up.applyMatrix4(L),B.up.reflect(E),B.lookAt(R),B.far=Me.far,B.updateMatrixWorld(),B.projectionMatrix.copy(Me.projectionMatrix),H.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),H.multiply(B.projectionMatrix),H.multiply(B.matrixWorldInverse),b.setFromNormalAndCoplanarPoint(E,N),b.applyMatrix4(B.matrixWorldInverse),F.set(b.normal.x,b.normal.y,b.normal.z,b.constant);let ee=B.projectionMatrix;U.x=(Math.sign(F.x)+ee.elements[8])/ee.elements[0],U.y=(Math.sign(F.y)+ee.elements[9])/ee.elements[5],U.z=-1,U.w=(1+ee.elements[10])/ee.elements[14],F.multiplyScalar(2/F.dot(U)),ee.elements[2]=F.x,ee.elements[6]=F.y,ee.elements[10]=F.z+1-i,ee.elements[14]=F.w,g.setFromMatrixPosition(Me.matrixWorld);let ie=V.getRenderTarget(),ye=V.xr.enabled,ae=V.shadowMap.autoUpdate;n.visible=!1,V.xr.enabled=!1,V.shadowMap.autoUpdate=!1,V.setRenderTarget(_),V.state.buffers.depth.setMask(!0),V.autoClear===!1&&V.clear(),V.render(Se,B),n.visible=!0,V.xr.enabled=ye,V.shadowMap.autoUpdate=ae,V.setRenderTarget(ie);let fe=Me.viewport;fe!==void 0&&V.state.viewport(fe)}}};var de=Ae(ge(),1),sr=class a extends de.Mesh{constructor(e,t={}){super(e),this.isReflector=!0,this.type="Reflector",this.camera=new de.PerspectiveCamera;let n=this,r=t.color!==void 0?new de.Color(t.color):new de.Color(8355711),s=t.textureWidth||512,i=t.textureHeight||512,c=t.clipBias||0,l=t.shader||a.ReflectorShader,f=t.multisample!==void 0?t.multisample:4,d=new de.Plane,h=new de.Vector3,m=new de.Vector3,g=new de.Vector3,y=new de.Matrix4,M=new de.Vector3(0,0,-1),A=new de.Vector4,b=new de.Vector3,E=new de.Vector3,N=new de.Vector4,D=new de.Matrix4,L=this.camera,j=new de.WebGLRenderTarget(s,i,{samples:f,type:de.HalfFloatType}),F=new de.ShaderMaterial({name:l.name!==void 0?l.name:"unspecified",uniforms:de.UniformsUtils.clone(l.uniforms),fragmentShader:l.fragmentShader,vertexShader:l.vertexShader});F.uniforms.tDiffuse.value=j.texture,F.uniforms.color.value=r,F.uniforms.textureMatrix.value=D,this.material=F,this.onBeforeRender=function(S,R,U){if(m.setFromMatrixPosition(n.matrixWorld),g.setFromMatrixPosition(U.matrixWorld),y.extractRotation(n.matrixWorld),h.set(0,0,1),h.applyMatrix4(y),b.subVectors(m,g),b.dot(h)>0)return;b.reflect(h).negate(),b.add(m),y.extractRotation(U.matrixWorld),M.set(0,0,-1),M.applyMatrix4(y),M.add(g),E.subVectors(m,M),E.reflect(h).negate(),E.add(m),L.position.copy(b),L.up.set(0,1,0),L.up.applyMatrix4(y),L.up.reflect(h),L.lookAt(E),L.far=U.far,L.updateMatrixWorld(),L.projectionMatrix.copy(U.projectionMatrix),D.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),D.multiply(L.projectionMatrix),D.multiply(L.matrixWorldInverse),D.multiply(n.matrixWorld),d.setFromNormalAndCoplanarPoint(h,m),d.applyMatrix4(L.matrixWorldInverse),A.set(d.normal.x,d.normal.y,d.normal.z,d.constant);let H=L.projectionMatrix;N.x=(Math.sign(A.x)+H.elements[8])/H.elements[0],N.y=(Math.sign(A.y)+H.elements[9])/H.elements[5],N.z=-1,N.w=(1+H.elements[10])/H.elements[14],A.multiplyScalar(2/A.dot(N)),H.elements[2]=A.x,H.elements[6]=A.y,H.elements[10]=A.z+1-c,H.elements[14]=A.w,n.visible=!1;let B=S.getRenderTarget(),_=S.xr.enabled,G=S.shadowMap.autoUpdate;S.xr.enabled=!1,S.shadowMap.autoUpdate=!1,S.setRenderTarget(j),S.state.buffers.depth.setMask(!0),S.autoClear===!1&&S.clear(),S.render(R,L),S.xr.enabled=_,S.shadowMap.autoUpdate=G,S.setRenderTarget(B);let q=U.viewport;q!==void 0&&S.state.viewport(q),n.visible=!0},this.getRenderTarget=function(){return j},this.dispose=function(){j.dispose(),n.material.dispose()}}};sr.ReflectorShader={name:"ReflectorShader",uniforms:{color:{value:null},tDiffuse:{value:null},textureMatrix:{value:null}},vertexShader:`
		uniform mat4 textureMatrix;
		varying vec4 vUv;

		#include <common>
		#include <logdepthbuf_pars_vertex>

		void main() {

			vUv = textureMatrix * vec4( position, 1.0 );

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

			#include <logdepthbuf_vertex>

		}`,fragmentShader:`
		uniform vec3 color;
		uniform sampler2D tDiffuse;
		varying vec4 vUv;

		#include <logdepthbuf_pars_fragment>

		float blendOverlay( float base, float blend ) {

			return( base < 0.5 ? ( 2.0 * base * blend ) : ( 1.0 - 2.0 * ( 1.0 - base ) * ( 1.0 - blend ) ) );

		}

		vec3 blendOverlay( vec3 base, vec3 blend ) {

			return vec3( blendOverlay( base.r, blend.r ), blendOverlay( base.g, blend.g ), blendOverlay( base.b, blend.b ) );

		}

		void main() {

			#include <logdepthbuf_fragment>

			vec4 base = texture2DProj( tDiffuse, vUv );
			gl_FragColor = vec4( blendOverlay( base.rgb, color ), 1.0 );

			#include <tonemapping_fragment>
			#include <colorspace_fragment>

		}`};var dn={};mn(dn,{clone:()=>Zi,retarget:()=>zn,retargetClip:()=>_i});var Oe=Ae(ge(),1);function zn(a,e,t={}){let n=new Oe.Vector3,r=new Oe.Quaternion,s=new Oe.Vector3,i=new Oe.Matrix4,c=new Oe.Matrix4,l=new Oe.Matrix4;t.preserveMatrix=t.preserveMatrix!==void 0?t.preserveMatrix:!0,t.preservePosition=t.preservePosition!==void 0?t.preservePosition:!0,t.preserveHipPosition=t.preserveHipPosition!==void 0?t.preserveHipPosition:!1,t.useTargetMatrix=t.useTargetMatrix!==void 0?t.useTargetMatrix:!1,t.hip=t.hip!==void 0?t.hip:"hip",t.names=t.names||{};let f=e.isObject3D?e.skeleton.bones:Er(e),d=a.isObject3D?a.skeleton.bones:Er(a),h,m,g,y,M;if(a.isObject3D?a.skeleton.pose():(t.useTargetMatrix=!0,t.preserveMatrix=!1),t.preservePosition){M=[];for(let A=0;A<d.length;A++)M.push(d[A].position.clone())}if(t.preserveMatrix){a.updateMatrixWorld(),a.matrixWorld.identity();for(let A=0;A<a.children.length;++A)a.children[A].updateMatrixWorld(!0)}if(t.offsets){h=[];for(let A=0;A<d.length;++A)m=d[A],g=t.names[m.name]||m.name,t.offsets[g]&&(m.matrix.multiply(t.offsets[g]),m.matrix.decompose(m.position,m.quaternion,m.scale),m.updateMatrixWorld()),h.push(m.matrixWorld.clone())}for(let A=0;A<d.length;++A){if(m=d[A],g=t.names[m.name]||m.name,y=Fn(g,f),l.copy(m.matrixWorld),y){if(y.updateMatrixWorld(),t.useTargetMatrix?c.copy(y.matrixWorld):(c.copy(a.matrixWorld).invert(),c.multiply(y.matrixWorld)),s.setFromMatrixScale(c),c.scale(s.set(1/s.x,1/s.y,1/s.z)),l.makeRotationFromQuaternion(r.setFromRotationMatrix(c)),a.isObject3D){let b=d.indexOf(m),E=h?h[b]:i.copy(a.skeleton.boneInverses[b]).invert();l.multiply(E)}l.copyPosition(c)}m.parent&&m.parent.isBone?(m.matrix.copy(m.parent.matrixWorld).invert(),m.matrix.multiply(l)):m.matrix.copy(l),t.preserveHipPosition&&g===t.hip&&m.matrix.setPosition(n.set(0,m.position.y,0)),m.matrix.decompose(m.position,m.quaternion,m.scale),m.updateMatrixWorld()}if(t.preservePosition)for(let A=0;A<d.length;++A)m=d[A],g=t.names[m.name]||m.name,g!==t.hip&&m.position.copy(M[A]);t.preserveMatrix&&a.updateMatrixWorld(!0)}function _i(a,e,t,n={}){n.useFirstFramePosition=n.useFirstFramePosition!==void 0?n.useFirstFramePosition:!1,n.fps=n.fps!==void 0?n.fps:30,n.names=n.names||[],e.isObject3D||(e=Ki(e));let r=Math.round(t.duration*(n.fps/1e3)*1e3),s=1/n.fps,i=[],c=new Oe.AnimationMixer(e),l=Er(a.skeleton),f=[],d,h,m,g,y;c.clipAction(t).play(),c.update(0),e.updateMatrixWorld();for(let M=0;M<r;++M){let A=M*s;zn(a,e,n);for(let b=0;b<l.length;++b)y=n.names[l[b].name]||l[b].name,m=Fn(y,e.skeleton),m&&(h=l[b],g=f[b]=f[b]||{bone:h},n.hip===y&&(g.pos||(g.pos={times:new Float32Array(r),values:new Float32Array(r*3)}),n.useFirstFramePosition&&(M===0&&(d=h.position.clone()),h.position.sub(d)),g.pos.times[M]=A,h.position.toArray(g.pos.values,M*3)),g.quat||(g.quat={times:new Float32Array(r),values:new Float32Array(r*4)}),g.quat.times[M]=A,h.quaternion.toArray(g.quat.values,M*4));c.update(s),e.updateMatrixWorld()}for(let M=0;M<f.length;++M)g=f[M],g&&(g.pos&&i.push(new Oe.VectorKeyframeTrack(".bones["+g.bone.name+"].position",g.pos.times,g.pos.values)),i.push(new Oe.QuaternionKeyframeTrack(".bones["+g.bone.name+"].quaternion",g.quat.times,g.quat.values)));return c.uncacheAction(t),new Oe.AnimationClip(t.name,-1,i)}function Zi(a){let e=new Map,t=new Map,n=a.clone();return Hn(a,n,function(r,s){e.set(s,r),t.set(r,s)}),n.traverse(function(r){if(!r.isSkinnedMesh)return;let s=r,i=e.get(r),c=i.skeleton.bones;s.skeleton=i.skeleton.clone(),s.bindMatrix.copy(i.bindMatrix),s.skeleton.bones=c.map(function(l){return t.get(l)}),s.bind(s.skeleton,s.bindMatrix)}),n}function Fn(a,e){for(let t=0,n=Er(e);t<n.length;t++)if(a===n[t].name)return n[t]}function Er(a){return Array.isArray(a)?a:a.bones}function Ki(a){let e=new Oe.SkeletonHelper(a.bones[0]);return e.skeleton=a,e}function Hn(a,e,t){t(a,e);for(let n=0;n<a.children.length;n++)Hn(a.children[n],e.children[n],t)}var me=Ae(ge(),1),Cr=class extends me.Scene{constructor(e=null){super();let t=new me.BoxGeometry;t.deleteAttribute("uv");let n=new me.MeshStandardMaterial({side:me.BackSide}),r=new me.MeshStandardMaterial,s=5;e!==null&&e._useLegacyLights===!1&&(s=900);let i=new me.PointLight(16777215,s,28,2);i.position.set(.418,16.199,.3),this.add(i);let c=new me.Mesh(t,n);c.position.set(-.757,13.219,.717),c.scale.set(31.713,28.305,28.591),this.add(c);let l=new me.Mesh(t,r);l.position.set(-10.906,2.009,1.846),l.rotation.set(0,-.195,0),l.scale.set(2.328,7.905,4.651),this.add(l);let f=new me.Mesh(t,r);f.position.set(-5.607,-.754,-.758),f.rotation.set(0,.994,0),f.scale.set(1.97,1.534,3.955),this.add(f);let d=new me.Mesh(t,r);d.position.set(6.167,.857,7.803),d.rotation.set(0,.561,0),d.scale.set(3.927,6.285,3.687),this.add(d);let h=new me.Mesh(t,r);h.position.set(-2.017,.018,6.124),h.rotation.set(0,.333,0),h.scale.set(2.002,4.566,2.064),this.add(h);let m=new me.Mesh(t,r);m.position.set(2.291,-.756,-2.621),m.rotation.set(0,-.286,0),m.scale.set(1.546,1.552,1.496),this.add(m);let g=new me.Mesh(t,r);g.position.set(-2.193,-.369,-5.547),g.rotation.set(0,.516,0),g.scale.set(3.875,3.487,2.986),this.add(g);let y=new me.Mesh(t,Ct(50));y.position.set(-16.116,14.37,8.208),y.scale.set(.1,2.428,2.739),this.add(y);let M=new me.Mesh(t,Ct(50));M.position.set(-16.109,18.021,-8.207),M.scale.set(.1,2.425,2.751),this.add(M);let A=new me.Mesh(t,Ct(17));A.position.set(14.904,12.198,-1.832),A.scale.set(.15,4.265,6.331),this.add(A);let b=new me.Mesh(t,Ct(43));b.position.set(-.462,8.89,14.52),b.scale.set(4.38,5.441,.088),this.add(b);let E=new me.Mesh(t,Ct(20));E.position.set(3.235,11.486,-12.541),E.scale.set(2.5,2,.1),this.add(E);let N=new me.Mesh(t,Ct(100));N.position.set(0,20,0),N.scale.set(1,.1,1),this.add(N)}dispose(){let e=new Set;this.traverse(t=>{t.isMesh&&(e.add(t.geometry),e.add(t.material))});for(let t of e)t.dispose()}};function Ct(a){let e=new me.MeshBasicMaterial;return e.color.setScalar(a),e}Object.assign(window.THREE_X={},{GLTFLoader:hr,RGBELoader:pr,EXRLoader:mr,EffectComposer:gr,RenderPass:xr,GTAOPass:Qt,SAOPass:tr,UnrealBloomPass:Et,BokehPass:Ar,SMAAPass:Mr,OutputPass:yr,ShaderPass:Mt,Sky:ir,Water:br,Reflector:sr,SkeletonUtils:dn,BufferGeometryUtils:Pr,RoomEnvironment:Cr,SimplexNoise:bt});})();
/*! Bundled license information:

three/examples/jsm/libs/fflate.module.js:
  (*!
  fflate - fast JavaScript compression/decompression
  <https://101arrowz.github.io/fflate>
  Licensed under MIT. https://github.com/101arrowz/fflate/blob/master/LICENSE
  version 0.6.9
  *)
*/
