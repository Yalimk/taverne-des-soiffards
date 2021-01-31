// //  Native modules import
// import React, { Button, useState } from "react";

// // Personal modules import
// import { isLoggedIn } from "../auth/index";
// import { remove } from "../post/apiPost";

// const ConfirmDelete = () => {
//   const [show, setShow] = useState(false);

//   const handleClose = () => setShow(false);
//   const handleShow = () => setShow(true);

//   const deletePost = () => {
//     try {
//       const postId = this.props.match.params.postId;
//       const token = isLoggedIn().token;
//       const response = remove(postId, token);
//       if (response.error) {
//         console.log(`The response couldn't be retrieved from the server. `);
//       } else {
//         handleClose();
//         this.setState({
//           redirectionPosts: true,
//         });
//       }
//     } catch (error) {
//       console.error(
//         `The deletePost method encountered the following error: ${error}.`
//       );
//     }
//   };

//   return (
//     <>
//       <Button variant="primary" onClick={handleShow}>
//         Supprimer
//       </Button>

//       <Modal show={show} onHide={handleClose}>
//         <Modal.Header closeButton>
//           <Modal.Title>Confirmation de suppression</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           Cliquer sur le bouton de confirmation supprimera définitivement ce
//           message.
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={deletePost}>
//             Fermer
//           </Button>
//           <Button variant="primary" onClick={handleClose}>
//             Confirmer
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </>
//   );
// };

// export default ConfirmDelete;
